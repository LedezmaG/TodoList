import React, { useContext, useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { AuthContext } from '../auth/AuthContext';
import { Button, Col, Row } from 'antd';
import { TodoItem } from '../components/TodoItem';
import { MessageAlert } from '../components/MessageAlert';
import { FileController } from '../components/FileController';
import services from '../services/Api';

import dividerBottom from '../assets/divider-round-bottom.svg'
import deco1 from '../assets/deco-1.svg'
import deco2 from '../assets/deco-2.svg'

export const Home = () => {

    const { user:{ user } } = useContext( AuthContext );
    const [notification, setNotification] = useState({
        state: false,
        type: '',
        msg: ''
    })
    const [data, setData] = useState([])

    const formValues = {
        message: '',
    }
    const validation = Yup.object({
        message: Yup.string()
            .min(3, 'Debe de tener por lo menos 3 caracteres')
            .max(50, 'Debe de tener 50 caracteres o menos')
            .required('Campo requerido'),
    })

    useEffect(() => { handleLoad() }, [])
    
    const handleLoad = async () => {
        try {
            const resp = await services.get(`/users/${user.id}/task`)
            if (resp.status !== 200) throw new Error("No se pudo establecer error")
            setData(resp.data)
        } catch (error) {
            console.log("🚀 ~ file: Home.jsx:44 ~ handleLoad ~ error:", error)
            setNotification({...notification, state: true, type: 'error', msg: error.message})
        }
    }

    const handleSubmit = async (values, resetForm) => {
        try {
            setNotification({...notification, state: false})
            const resp = await services.post(
                `/users/${user.id}/task`,
                {
                    task: values.message,
                    is_done: false,
                }
            )
            if (resp.status !== 201) throw new Error("No se pudo establecer error")
            resetForm()
            handleLoad()
            setNotification({...notification, state: true, type: 'ok', msg: 'Tarea creada'})
        } catch (error) {
            console.log("🚀 ~ file: Home.jsx:64 ~ handleSubmit ~ error:", error)
            setNotification({...notification, state: true, type: 'error', msg: error.message})
        }
    }

    return (
        <Row>
            <MessageAlert open={notification.state} type={notification.type} msg={notification.msg} />
            <Col span={24} className="title-section" >
                <div className='txt-center'>
                    <h1 className='txt-xl'>Todo List</h1>
                    <span className='txt-l'>Agrega tareas, pendientes o recordatorios de una manera facil y rapida.</span>
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
                            <Button 
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Agregar
                            </Button>
                        </Form>
                    )}
                    </Formik>
                </div>

                <div className="decoration right">
                    <div className='type-1 right' />
                    <img src={deco1} alt="divider"/>
                </div>
                <div className="decoration left-bottom">
                    <div className='type-2 ' />
                    <img src={deco2} alt="divider"/>
                </div>
                <img src={dividerBottom} alt="divider" className='divider' />
            </Col>
            <Col span={24} className="list-section" >
                {data.length > 0 && data.map((item) => <TodoItem 
                        key={item.id} 
                        id={item.id}
                        isDone={item.is_done}
                        message={item.task}
                        onReload={handleLoad} 
                        notification={notification}
                        setNotification={setNotification}
                    />
                )}
            </Col>
        </Row>
    )
}
