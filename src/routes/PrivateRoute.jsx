import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { LayoutPrivate } from '../components/LayoutPrivate'

export const PrivateRoute = ({ isAuth, component: Component}) => {
  return (
    (isAuth) 
      ? <LayoutPrivate>
        <Component />
      </LayoutPrivate>
      : <Navigate to="/sign-in" />
  )
}

PrivateRoute.prototype = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}
