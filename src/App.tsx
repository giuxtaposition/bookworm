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
import { Book as BookEntity } from './types/Book'
import { User } from './types/User'

type BookAction = 'ADDED' | 'DELETED' | 'EDITED'

const App: React.FC = () => {
    const [token, setToken] = useState<string | undefined>(undefined)
    const [user, setUser] = useState<User | undefined>(undefined)
    const client = useApolloClient()
    const history = useHistory()

    const [getUser] = useLazyQuery(CURRENT_USER, {
        fetchPolicy: 'network-only',
        onCompleted: data => {
            setUser(data.me)
        },
    })

    const [getBooks] = useLazyQuery(ALL_BOOKS)

    const includedIn = (books: BookEntity[], book: BookEntity) =>
        books.map(b => b.id).includes(book.id)

    const isEquivalent = (userInStore: User, currentUser: User) => {
        // Create arrays of property names
        const aProps = Object.getOwnPropertyNames(userInStore)
        const bProps = Object.getOwnPropertyNames(currentUser)

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length !== bProps.length) {
            return false
        }

        for (let i = 0; i < aProps.length; i++) {
            const propName = aProps[i]

            // If values of same property are not equal,
            // objects are not equivalent
            if (
                userInStore[propName as keyof User] !==
                currentUser[propName as keyof User]
            ) {
                return false
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true
    }

    const updateBookCache = (book: BookEntity, type: BookAction) => {
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
                            (bookInStore: BookEntity) =>
                                bookInStore.id !== book.id
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
                                (bookInStore: BookEntity) =>
                                    bookInStore.id !== book.id
                            )
                            .concat(book),
                    },
                })
            }
        }
    }

    const updateUserCache = (user: User) => {
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

        if (loggedUserToken) {
            setToken(loggedUserToken)
        }
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
        setToken(undefined)
        setUser(undefined)
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

                    {user && (
                        <PrivateRoute path='/settings'>
                            <AccountSettings user={user} />
                        </PrivateRoute>
                    )}

                    {user && (
                        <PrivateRoute path='/profile'>
                            <UserProfile user={user} />
                        </PrivateRoute>
                    )}

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
