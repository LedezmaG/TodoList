import React from 'react'
import { Popconfirm } from 'antd'

export const ConfirmMsg = ({title, description, content, onConfirm, onCancel}) => {
    return (
        <Popconfirm
            title={title}
            description={description}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
        >
            {content}
        </Popconfirm>
    )
}
