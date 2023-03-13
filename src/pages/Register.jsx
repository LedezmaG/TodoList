import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Button } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { FileController } from '../components/FileController';
import services from '../services/Api';
import { MessageAlert } from '../components/MessageAlert';
import { types } from '../types/types';



export const Register = () => {

    const { dispatch } = useContext( AuthContext );
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

    const handleRegister = async (values) => {
        try {
            setNotification({...notification, state: false})
            const resp = await services.post(
                '/users',
                {
                    name: values.name,
                    user: values.user,
                    password: values.pswd
                }
            )
            if (resp.status !== 201) throw new Error("No se pudo establecer error")
            setNotification({...notification, state: true, type: 'ok', msg: 'Usuario creado con exito'})
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
                            <Button 
                                block
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Registrarse
                            </Button>
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
