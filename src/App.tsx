import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import './App.css'
import AccountSettings from './components/Account/AccountSettings/AccountSettings'
import LoginForm from './components/Account/LoginForm'
import SignUpForm from './components/Account/SignUpForm'
import UserProfile from './components/Account/UserProfile/UserProfile'
import Book from './components/Book/Book'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Library from './components/Library/Library'
import PrivateRoute from './components/PrivateRoute'
import Search from './components/Search/Search'
import Stats from './components/Stats/Stats'
import { globalTheme } from './components/theme'
import { ALL_BOOKS, CURRENT_USER } from './graphql/queries'
import {
    BOOK_ADDED,
    BOOK_DELETED,
    BOOK_EDITED,
    USER_PROFILE_EDITED,
} from './graphql/subscriptions'

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState(null)
    const client = useApolloClient()
    const history = useHistory()

    const [getUser] = useLazyQuery(CURRENT_USER, {
        fetchPolicy: 'network-only',
        onCompleted: data => {
            setUser(data)
        },
    })

    const [getBooks] = useLazyQuery(ALL_BOOKS)

    const includedIn = (set: any, object: any) =>
        set.map((b: any) => b.id).includes(object.id)

    const isEquivalent = (a: any, b: any) => {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a)
        var bProps = Object.getOwnPropertyNames(b)

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length !== bProps.length) {
            return false
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i]

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true
    }

    const updateBookCache = (
        book: any,
        type: 'ADDED' | 'DELETED' | 'EDITED'
    ) => {
        // Check that added book is not included in the current store
        const dataInStore = client.readQuery({ query: ALL_BOOKS })

        if (type === 'ADDED') {
            if (!includedIn(dataInStore.allBooks, book)) {
                client.writeQuery({
                    query: ALL_BOOKS,
                    data: { allBooks: dataInStore.allBooks.concat(book) },
                })
            }
        }

        if (type === 'DELETED') {
            if (includedIn(dataInStore.allBooks, book)) {
                client.writeQuery({
                    query: ALL_BOOKS,
                    data: {
                        allBooks: dataInStore.allBooks.filter(
                            (bookInStore: any) => bookInStore.id !== book.id
                        ),
                    },
                })
            }
        }

        if (type === 'EDITED') {
            if (!includedIn(dataInStore.allBooks, book)) {
                client.writeQuery({
                    query: ALL_BOOKS,
                    data: {
                        allBooks: dataInStore.allBooks
                            .filter(
                                (bookInStore: any) => bookInStore.id !== book.id
                            )
                            .concat(book),
                    },
                })
            }
        }
    }

    const updateUserCache = (user: any) => {
        const dataInStore = client.readQuery({ query: CURRENT_USER })

        if (!isEquivalent(dataInStore.me, user)) {
            client.writeQuery({
                query: CURRENT_USER,
                data: {
                    me: user,
                },
            })
        }
    }

    useSubscription(BOOK_EDITED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const editedBook = subscriptionData.data.bookEdited
            updateBookCache(editedBook, 'EDITED')
        },
    })

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            updateBookCache(addedBook, 'ADDED')
        },
    })

    useSubscription(BOOK_DELETED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const deletedBook = subscriptionData.data.bookDeleted
            updateBookCache(deletedBook, 'DELETED')
        },
    })

    useSubscription(USER_PROFILE_EDITED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const updatedUser = subscriptionData.data.userProfileUpdated
            updateUserCache(updatedUser)
        },
    })

    useEffect(() => {
        const loggedUserToken = window.localStorage.getItem(
            'bookworm-user-token'
        )
        setToken(loggedUserToken)
    }, [])

    useEffect(() => {
        if (token) {
            getUser()
            getBooks()
        }
    }, [token, getUser, getBooks])

    const logout = async () => {
        history.push('/')
        await client.clearStore()
        setToken(null)
        setUser(null)
        localStorage.clear()
    }

    return (
        <ChakraProvider theme={globalTheme}>
            <div className='App'>
                <Header logout={logout} user={user} />

                <Switch>
                    <Route exact path='/'>
                        <Home setToken={setToken} user={user} />
                    </Route>

                    <Route path='/search'>
                        <Search user={user} />
                    </Route>

                    <PrivateRoute path='/library'>
                        <Library />
                    </PrivateRoute>

                    <PrivateRoute path='/stats'>
                        <Stats />
                    </PrivateRoute>

                    <PrivateRoute path='/settings'>
                        <AccountSettings user={user} />
                    </PrivateRoute>

                    <PrivateRoute path='/profile'>
                        <UserProfile user={user} />
                    </PrivateRoute>

                    <Route path='/signin'>
                        <LoginForm setToken={setToken} user={user} />
                    </Route>

                    <Route path='/signup'>
                        <SignUpForm user={user} />
                    </Route>

                    <Route path='/book/:id'>
                        <Book user={user} />
                    </Route>
                </Switch>
            </div>
        </ChakraProvider>
    )
}

export default App
