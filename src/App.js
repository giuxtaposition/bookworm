import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { ChakraProvider, Heading } from '@chakra-ui/react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/Account/LoginForm'
import { useHistory } from 'react-router-dom'
import SignUpForm from './components/Account/SignUpForm'
import Library from './components/Library/Library'
import { ALL_BOOKS } from './graphql/queries'
import { BOOK_ADDED, BOOK_DELETED, BOOK_EDITED } from './graphql/subscriptions'
import Stats from './components/Stats/Stats'
import Home from './components/Home/Home'
import { globalTheme } from './components/theme'
import Settings from './components/Account/Settings'

const RedirectToSignin = ({ token, children, history }) => {
  if (token) {
    return <>{children}</>
  } else {
    history.push('/signin')
  }
}

function App() {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const history = useHistory()

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('bookworm-user-token')
    setToken(loggedUserToken)
  }, [])

  const logout = async () => {
    await history.push('/')
    setToken(null)
    localStorage.clear()
    await client.resetStore()
  }

  // Listen for new books and update cache when subscription data arrives
  const updateCacheWith = (book, type) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)

    // Check that added book is not included in the current store
    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (type === 'ADDED') {
      console.log('added type', book)
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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook, 'ADDED')
    },
  })

  useSubscription(BOOK_DELETED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const deletedBook = subscriptionData.data.bookDeleted
      updateCacheWith(deletedBook, 'DELETED')
    },
  })

  useSubscription(BOOK_EDITED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const editedBook = subscriptionData.data.bookEdited
      updateCacheWith(editedBook, 'EDITED')
    },
  })

  return (
    <ChakraProvider theme={globalTheme}>
      <div className='App'>
        <Header token={token} logout={logout} />

        <Switch>
          <Route exact path='/'>
            <Home updateCacheWith={updateCacheWith} />
          </Route>

          <Route path='/library'>
            {token ? (
              <Library updateCacheWith={updateCacheWith} />
            ) : (
              <Heading>Please Log In to use these features!</Heading>
            )}
          </Route>

          <Route path='/stats'>
            {token ? (
              <Stats />
            ) : (
              <Heading>Please Log In to use these features!</Heading>
            )}
          </Route>

          <Route path='/settings'>
            {token ? (
              <Settings />
            ) : (
              <Heading>Please Log In to use these features!</Heading>
            )}
          </Route>

          <Route path='/signin'>
            <LoginForm setToken={setToken} token={token} />
          </Route>

          <Route path='/signup'>
            <SignUpForm token={token} />
          </Route>
        </Switch>
      </div>
    </ChakraProvider>
  )
}

export default App
