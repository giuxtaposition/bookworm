import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { ChakraProvider, Heading } from '@chakra-ui/react'
import { useApolloClient } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/Account/LoginForm'
import { useHistory } from 'react-router-dom'
import SignUpForm from './components/Account/SignUpForm'
import Library from './components/Library/Library'

function App() {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const history = useHistory()

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('bookworm-user-token')
    setToken(loggedUserToken)
  }, [])

  const logout = () => {
    history.push('/')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <ChakraProvider>
      <div className='App'>
        <Header token={token} logout={logout} />

        <Switch>
          <Route exact path='/'></Route>

          <Route path='/library'>
            {token ? (
              <Library />
            ) : (
              <Heading>Please Log In to use these features!</Heading>
            )}
          </Route>
          <Route path='/stats'>
            {token ? (
              <></>
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
