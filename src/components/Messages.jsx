import { Button, message } from 'antd';
import React, { useEffect } from 'react'

export const Messages = ({open, msg}) => {

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (open) {
            messageApi.info(msg);
        }
    }, [open])

    return (
        <>
            {contextHolder}
        </>
    )
}
