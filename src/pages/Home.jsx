import React, { useContext, useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { AuthContext } from '../auth/AuthContext';
import { Col, Row } from 'antd';
import { TodoItem } from '../components/TodoItem';
import { MessageAlert } from '../components/MessageAlert';
import { FileController } from '../components/FileController';
import { MyButton } from '../components/MyButton';
import { Messages } from '../components/Messages';
import { useApi } from '../hooks/useApi';
import services from '../services/Api';

import dividerBottom from '../assets/divider-round-bottom.svg'
import deco1 from '../assets/deco-1.svg'
import deco2 from '../assets/deco-2.svg'

export const Home = () => {

    const { user:{ user } } = useContext( AuthContext );
    const { data, loading, error, onReload, onPost } = useApi(`/users/${user.id}/task`)
    const [messages, setMessages] = useState({
        state: false,
        msg: ''
    })
    const [notification, setNotification] = useState({
        state: false,
        type: '',
        msg: ''
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

    useEffect(() => welcomeMsg(),[])
    const welcomeMsg = () => {
        setMessages({...messages, state: true, msg: `Bienvenido ${user.name}`})
        setTimeout(()=>{ setMessages({...messages, state: false}) }, 1000)
    }
    useEffect(() => { 
        if (error) {
            setNotification({...notification, state: true, type: 'error', msg: error})
        }
    }, [error])

    const handleSubmit = async (values, resetForm) => {
        try {
            setNotification({...notification, state: false})
            setMessages({...messages, state: true, msg: `Cargando...`})
            const resp = await onPost({
                newPath: `/users/${user.id}/task`,
                data: {
                    task: values.message,
                    is_done: false,
                }
            })
            resetForm()
            onReload()
            if (resp.status) setNotification({
                ...notification, 
                state: true, 
                type: 'ok', 
                msg:'Tarea actualizada'
            })
        } catch (error) {
            setNotification({...notification, state: true, type: 'error', msg: error.message})
        }
    }

    return (
        <Row>
            <Messages open={messages.state} msg={messages.msg} />
            <MessageAlert open={notification.state} type={notification.type} msg={notification.msg} />
            <Col span={24} className="title-section" >
                <div className='txt-center'>
                    <h1 className='txt-xl'>Todo List</h1>
                    <span className='txt-l sub-title'>Agrega tareas, pendientes o recordatorios de una manera facil y rapida.</span>
                    <br />
                    <Formik
                        initialValues={formValues}
                        validationSchema={validation}
                        onSubmit={(values, { resetForm })=>handleSubmit(values, resetForm)}
                    >
                    { () => (
                        <Form className='form-main-content'>
                            <FileController
                                type="text"
                                name="message" 
                                size="lg"
                                placeholder="Escribe algo..."
                            />
                            <MyButton 
                                size="large"
                                type="primary"
                                htmlType="submit"
                                content={<b>Agregar</b>}
                            />
                            
                        </Form>
                    )}
                    </Formik>
                </div>

                <div className="decoration right">
                    <div className='type-1 right' />
                    <img src={deco1} alt="decoration" className='deco' />
                </div>
                <div className="decoration left-bottom">
                    <div className='type-2 ' />
                    <img src={deco2} alt="decoration" className='deco'/>
                </div>
                <img src={dividerBottom} alt="divider" className='divider' />
            </Col>
            <Col span={24} className="list-section" >
                {(data.length > 0) && data.map((item) => <TodoItem 
                        key={item.id} 
                        id={item.id}
                        isDone={item.is_done}
                        message={item.task}
                        onReload={onReload} 
                        notification={notification}
                        setNotification={setNotification}
                    />
                )}
                {( loading ) && <span>Cargando...</span>}
            </Col>
        </Row>
    )
}
