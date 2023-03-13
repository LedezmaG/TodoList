import React, { useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/AuthReducer'
import { Navegation } from './routes/Navegation'

import './styles/app.scss'
import './styles/layout.scss'

export const App = () => {

  const [user, dispatch] = useReducer(authReducer, {})

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <Navegation />
    </AuthContext.Provider>
  )
}

export default App