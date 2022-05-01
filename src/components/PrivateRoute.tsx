import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
    children: React.ReactNode
}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
    const loggedUserToken = window.localStorage.getItem('bookworm-user-token')
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedUserToken ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: '/signin', state: { from: location } }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute
