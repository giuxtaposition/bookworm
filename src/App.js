import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { ChakraProvider } from '@chakra-ui/react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/Account/LoginForm'
import { useHistory } from 'react-router-dom'
import SignUpForm from './components/Account/SignUpForm'
import Library from './components/Library/Library'
import { BOOK_ADDED, BOOK_DELETED, BOOK_EDITED } from './graphql/subscriptions'
import Stats from './components/Stats/Stats'
import Home from './components/Home/Home'
import { globalTheme } from './components/theme'
import Settings from './components/Account/Settings'
import PrivateRoute from './components/PrivateRoute'
import UpdateCacheWith from './graphql/updateCache'

function App() {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const history = useHistory()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      UpdateCacheWith(addedBook, 'ADDED')
    },
  })

  useSubscription(BOOK_DELETED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const deletedBook = subscriptionData.data.bookDeleted
      UpdateCacheWith(deletedBook, 'DELETED')
    },
  })

  useSubscription(BOOK_EDITED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const editedBook = subscriptionData.data.bookEdited
      UpdateCacheWith(editedBook, 'EDITED')
    },
  })

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('bookworm-user-token')
    setToken(loggedUserToken)
  }, [])

  const logout = async () => {
    await history.push('/')
    await client.resetStore()
    setToken(null)
    localStorage.clear()
  }

  return (
    <ChakraProvider theme={globalTheme}>
      <div className='App'>
        <Header token={token} logout={logout} />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <PrivateRoute
            path='/library'
            token={token}
            component={Library}
          ></PrivateRoute>

          <PrivateRoute
            path='/stats'
            token={token}
            component={Stats}
          ></PrivateRoute>

          <PrivateRoute
            path='/settings'
            token={token}
            component={Settings}
          ></PrivateRoute>

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
