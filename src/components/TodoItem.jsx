import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { MyButton } from './MyButton';
import {
    CheckOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { FileController } from './FileController';
import services from '../services/Api';
import { ConfirmMsg } from './ConfirmMsg';

export const TodoItem = ({ id, isDone, message, setNotification, notification, onReload }) => {

    const { user:{user} } = useContext( AuthContext );

    const [state, setState] = useState({
        edit: false,
        loading: false
    })
    const formValues = {
        message: '',
    }
    const validation = Yup.object({
        message: Yup.string()
            .min(3, 'Debe de tener por lo menos 3 caracteres')
            .max(50, 'Debe de tener 50 caracteres o menos')
            .required('Campo requerido'),
    })

    const onDone = async () => {
        try {
            setNotification({...notification, state: false})
            setState({...state, loading: true})
            const resp = await services.put(
                `/users/${user.id}/task/${id}`,
                {
                    is_done: !isDone,
                }
            )
            setNotification({...notification, state: true, type: 'ok', msg:'Tarea actualizada'})
            setState({...state, loading: false})
            onReload()
            if (resp.status !== 200) throw new Error("No se pudo establecer conexion")
        } catch (error) {
            setState({...state, loading: false})
            setNotification({...notification, state: true, type: 'error', msg: error.message})
        }
    }

    const onEdit = async ( message, resetForm ) => {
        try {
            setNotification({...notification, state: false})
            setState({...state, loading: true})
            const resp = await services.put(
                `/users/${user.id}/task/${id}`,
                {
                    task: message,
                }
            )
            setState({...state, loading: false, edit: false})
            setNotification({...notification, state: true, type: 'ok', msg:'Tarea actualizada'})
            resetForm()
            onReload()
            if (resp.status !== 200) throw new Error("No se pudo establecer conexion")
        } catch (error) {
            setState({...state, loading: false})
            setNotification({...notification, state: true, type: 'error', msg: error.message})
        }
    }

    const onDelete = async () => {
        try {
            setNotification({...notification, state: false})
            setState({...state, loading: true})
            const resp = await services.delete(
                `/users/${user.id}/task/${id}`
            )
            if (resp.status !== 200) throw new Error("No se pudo establecer conexion")
            setState({...state, loading: false})
            setNotification({...notification, state: true, type: 'ok', msg:'Tarea eliminada'})
            onReload()
        } catch (error) {
            setState({...state, loading: false})
            setNotification({...notification, state: true, type: 'error', msg: error.message})
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="item-check">
                    <MyButton
                        type={ isDone ? "primary" : "default" }
                        shape="circle" 
                        size='large' 
                        icon={ <CheckOutlined /> } 
                        onClick={onDone}
                    />
                </div>
                <div className="item-body">

                    { state.edit 
                        ? <Formik
                            initialValues={formValues}
                            validationSchema={validation}
                            onSubmit={({message}, { resetForm })=>onEdit(message, resetForm)}
                        >
                        { () => (
                            <Form className='form-edit-content'>
                                <FileController
                                    type="text"
                                    name="message" 
                                    placeholder={message}
                                />
                                <MyButton
                                    type="primary"
                                    htmlType="submit"
                                    content={<b>Editar</b>}
                                />
                            </Form>
                        )}
                        </Formik>
                        : <h3 className={ isDone && 'card-done'}> {message} </h3>
                    }
                    { (state.loading) && <span> Cargando... </span>}
                </div>
                <span className='item-op'>
                    <MyButton
                        shape="circle" 
                        size='large' 
                        icon={<EditOutlined />} 
                        onClick={() => setState({...state, edit: true})}
                    />
                    <ConfirmMsg
                        title='Eliminar'
                        description='Estas seguro de eliminar tarea?'
                        onConfirm={onDelete}
                        content={
                            <MyButton
                                shape="circle" 
                                size='large' 
                                icon={<DeleteOutlined />}
                            />
                        }
                    />
                </span>
            </div>
        </div>
    )
}
