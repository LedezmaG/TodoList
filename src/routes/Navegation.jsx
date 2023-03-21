import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { types } from '../types/types'
import { AuthContext } from '../auth/AuthContext';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useApi } from '../hooks/useApi';

export const Navegation = () => {

    const { user:{ logged }, dispatch } = useContext( AuthContext );    
    const { onGet } = useApi(`/users/${localStorage.getItem('userId')}`)
    useEffect(() =>{ onLoad() }, [logged, dispatch])

    
    const onLoad = async () => {
        try {
            const resp = await onGet({newPath: `/users/${localStorage.getItem('userId')}`})
            if ( !localStorage.getItem('logged') ) throw new Error('logget false')
            if ( !resp.status ) throw new Error('User not found')
            
            return dispatch({
                type: types.login,
                payload: {
                    logged: true,
                    user: {
                        ...resp.data
                    }
                }
            })
        } catch (error) {
            console.log("🚀 ~ file: Navegation.jsx:36 ~ onLoad ~ error:", error)
            return(
                dispatch({
                    type: types.logout
                }),
                <Navigate to="/sign-in" />
            )
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/sign-in"
                    element={<PublicRoute isAuth={logged} component={Login} />}
                />
                <Route
                    exact
                    path="/signup"
                    element={<PublicRoute isAuth={logged} component={Register} />}
                />
                <Route
                    exact
                    path="/"
                    element={<PrivateRoute isAuth={logged} component={Home} />}
                />
                <Route path="*" element={ <Navigate to="/" replace /> } />
            </Routes>
        </BrowserRouter>
    )
}
