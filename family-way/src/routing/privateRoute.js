import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authContext } from '../contexts/auth/authstate'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated , token } = useContext(authContext)
  return (
    <Route
      {...rest}
      render={props =>
        token === null ? (
          <Redirect to='login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
