import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Link, Navigate } from 'react-router-dom';
import { FileController } from '../components/FileController';
import services from '../services/Api';
import { MessageAlert } from '../components/MessageAlert';
import { types } from '../types/types';
import { MyButton } from '../components/MyButton';
import { useApi } from '../hooks/useApi';



export const Register = () => {

    const { dispatch } = useContext( AuthContext );
    const { error, onPost } = useApi()
    const [notification, setNotification] = useState({
        state: false,
        type: '',
        msg: ''
    })
    
    const formValues = {
        user: '',
        name: '',
        pswd: '',
        confPswd: '',
    }
    const validation = Yup.object({
        user: Yup.string()
            .min(5, 'Debe de tener por lo menos 5 caracteres')
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Campo requerido'),
        name: Yup.string()
            .min(8, 'Debe de tener por lo menos 8 caracteres')
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Campo requerido'),
        pswd: Yup.string()
            .min(8, 'Debe de tener por lo menos 8 caracteres')
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Campo requerido'),
        confPswd: Yup.string()
            .oneOf([Yup.ref('pswd')], "Las contraseñas no son iguales")
            .required('Campo requerido'),
    })
    useEffect(() => { 
        if (error) {
            setNotification({...notification, state: true, type: 'error', msg: error})
        }
    }, [error])
    const handleRegister = async (values) => {
        try {
            setNotification({...notification, state: false})
            const resp = await onPost({
                newPath: '/users',
                data: {
                    name: values.name,
                    user: values.user,
                    password: values.pswd
                }
            })
            if (resp.status) setNotification({
                    ...notification, 
                    state: true, 
                    type: 'ok', 
                    msg: 'Usuario creado con exito'
                })
            localStorage.setItem('logged', true)
            dispatch({
                type: types.login,
                payload: {
                    logged: true,
                    user: {
                        ...resp.data,
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
                <h2>Registro</h2>
                <Formik
                    initialValues={formValues}
                    validationSchema={validation}
                    onSubmit={(values)=>handleRegister(values)}
                >
                    { () => (
                        <Form>
                            <FileController
                                type="text"
                                name="name" 
                                size="lg"
                                label="Nombre"
                            />
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
                            <FileController
                                type="password"
                                name="confPswd" 
                                label="Confirmar contraseña"
                                size="lg"
                            />
                            <MyButton
                                block
                                size="large"
                                type="primary"
                                htmlType="submit"
                                content={<b>Registrarse</b>}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                ¿Ya tienes una cuenta? Iniciar sesión
                <Link to="/sign-in" > Iniciar sesión </Link>
            </div>
        </>
    )
}
