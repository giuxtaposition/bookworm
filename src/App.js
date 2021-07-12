import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { ChakraProvider } from '@chakra-ui/react'
import { useApolloClient, useSubscription, useLazyQuery } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/Account/LoginForm'
import { useHistory } from 'react-router-dom'
import SignUpForm from './components/Account/SignUpForm'
import Library from './components/Library/Library'
import { BOOK_ADDED, BOOK_DELETED, BOOK_EDITED } from './graphql/subscriptions'
import Stats from './components/Stats/Stats'
import Home from './components/Home/Home'
import { globalTheme } from './components/theme'
import AccountSettings from './components/Account/AccountSettings'
import PrivateRoute from './components/PrivateRoute'
import UpdateCacheWith from './graphql/updateCache'
import { CURRENT_USER } from './graphql/queries'

function App() {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const history = useHistory()

  const [getUser] = useLazyQuery(CURRENT_USER)

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

  useEffect(() => {
    getUser()
  }, [token, getUser])

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

          <PrivateRoute path='/library' component={Library}></PrivateRoute>

          <PrivateRoute path='/stats' component={Stats}></PrivateRoute>

          <PrivateRoute
            path='/settings'
            component={AccountSettings}
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
