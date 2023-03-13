import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { types } from '../types/types';
import * as Yup from 'yup'

import { Button } from 'antd';
import { FileController } from '../components/FileController';
import { MessageAlert } from '../components/MessageAlert';
import services from '../services/Api';

export const Login = () => {

    const { dispatch } = useContext( AuthContext );
    const [notification, setNotification] = useState({
        state: false,
        type: '',
        msg: ''
    })

    const formValues = {
        user: 'Juston89',
        pswd: '8dIt8tk2ZGm37YA',
    }

    const validation = Yup.object({
        user: Yup.string()
            .min(5, 'Debe de tener por lo menos 5 caracteres')
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Campo requerido'),
        pswd: Yup.string()
            .min(8, 'Debe de tener por lo menos 8 caracteres')
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Campo requerido'),
    })

    const handleLogin = async (values) => {
        try {
            setNotification({...notification, state: false})
            const resp = await services.get('/users')
            if (resp.status !== 200) throw new Error("No se pudo establecer error")
            const isValid = resp.data.filter((user) => ((values.user === user.user && values.pswd === user.password ) && user) )
            if (isValid.length === 0 ) throw new Error("Usuario no existe, Intenta con usuaro o contraseña diferente")
            localStorage.setItem('logged', true)
            dispatch({
                type: types.login,
                payload: {
                    logged: true,
                    user: {
                        ...isValid[0],
                    }
                }
            });
            return( Navigate( "/dashboard" ) )
        } catch (error) {
            setNotification({...notification, state: true, type: 'error', msg: error.message})
        }
    }

    return (
        <>
            <MessageAlert open={notification.state} type={notification.type} msg={notification.msg} />
            <div className='txt-xl'>
                Todo List
            </div>
            <div className="box-auth">
                <h2>Sign In</h2>
                <Formik
                    initialValues={formValues}
                    validationSchema={validation}
                    onSubmit={(values)=>handleLogin(values)}
                >
                    { () => (
                        <Form>
                            <FileController
                                type="text"
                                name="user" 
                                size="lg"
                                label="Usuario"
                            />
                            
                            <FileController
                                type="password"
                                name="pswd" 
                                size="lg"
                                label="Contraseña"
                            />
                            <Button 
                                block
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                ¿Aún no tienes una cuenta? 
                <Link to="/signup" > Registrate </Link>
            </div>
        </>
    )
}
