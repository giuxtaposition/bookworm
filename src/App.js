import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { ChakraProvider } from '@chakra-ui/react'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/Account/LoginForm'
import { useHistory } from 'react-router-dom'
import SignUpForm from './components/Account/SignUpForm'
import Library from './components/Library/Library'
import {
  BOOK_ADDED,
  BOOK_DELETED,
  BOOK_EDITED,
  USER_PROFILE_EDITED,
} from './graphql/subscriptions'
import Stats from './components/Stats/Stats'
import Home from './components/Home/Home'
import { globalTheme } from './components/theme'
import AccountSettings from './components/Account/AccountSettings/AccountSettings'
import PrivateRoute from './components/PrivateRoute'
import { CURRENT_USER, ALL_BOOKS } from './graphql/queries'
import UserProfile from './components/Account/UserProfile/UserProfile'
import Search from './components/Search/Search'
import Book from './components/Book/Book'

function App() {
  const [token, setToken] = useState(null)
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

  const includedIn = (set, object) => set.map(b => b.id).includes(object.id)
  const isEquivalent = (a, b) => {
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

  const updateBookCache = (book, type) => {
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
              bookInStore => bookInStore.id !== book.id
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
              .filter(bookInStore => bookInStore.id !== book.id)
              .concat(book),
          },
        })
      }
    }
  }

  const updateUserCache = user => {
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
      updateBookCache(editedBook)
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
    const loggedUserToken = window.localStorage.getItem('bookworm-user-token')
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
            <Home />
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
