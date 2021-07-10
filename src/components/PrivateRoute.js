import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedUserToken = window.localStorage.getItem('bookworm-user-token')
  return (
    <Route
      {...rest}
      render={props =>
        loggedUserToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
