import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  const loggedUserToken = window.localStorage.getItem('bookworm-user-token')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedUserToken ? (
          children
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
