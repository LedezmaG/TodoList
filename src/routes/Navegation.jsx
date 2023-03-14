import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { types } from '../types/types'
import { AuthContext } from '../auth/AuthContext';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const Navegation = () => {

    const { user:{ logged, user }, dispatch } = useContext( AuthContext );

    useEffect(() =>{ onLoad() }, [logged, dispatch])

    const onLoad = async () => {
        if ( localStorage.getItem('logged') && user) {
            return dispatch({
                type: types.login,
                payload: {
                    logged: true,
                    user: {
                        ...user
                    }
                }
            })
        }
        return(
            dispatch({
                type: types.logout
            }),
            <Navigate to="/sign-in" />
        )
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
