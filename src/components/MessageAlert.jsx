import React, { useEffect } from 'react'
import { notification } from 'antd';
import { CheckCircleOutlined, CloseOutlined, WarningOutlined } from '@ant-design/icons';

export const MessageAlert = ({open, type, msg}) => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (open) {
            let conf 
            if (type === 'ok') {
                conf = {
                    message: 'Excelente trabajo!',
                    description: msg,
                    icon: (<CheckCircleOutlined style={{ color: '#3CBB58', }} />),
                }
            }
            if (type === 'error') {
                conf = {
                    message: 'Ups, algo salió mal',
                    description: msg,
                    icon: (<CloseOutlined style={{ color: '#DB2424', }}/> ),
                }
            }
            if (type === 'alert') {
                conf = {
                    message: 'Alerta de sistema!',
                    description: msg,
                    icon: (<WarningOutlined style={{ color: '#FFB500', }} />),
                }
            }
            api.open(conf);
        }
    }, [open])

    return (
        <>
            {contextHolder}
        </>
    )
}
