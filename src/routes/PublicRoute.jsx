import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { LayoutPublic } from '../components/LayoutPublic'

export const PublicRoute = ({ isAuth, component: Component }) => {
  return (
    (!isAuth) 
      ? <LayoutPublic>
        <Component />
      </LayoutPublic>
      : <Navigate to="/" />
  )
}

PublicRoute.prototype = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}
