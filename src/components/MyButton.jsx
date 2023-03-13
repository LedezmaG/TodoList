import { Button } from 'antd'
import React from 'react'

export const MyButton = ({ content, icon, ...conf }) => {
    return (
        <Button 
            icon={icon}    
            {...conf} 
        >
            {content && content}
        </Button>
    )
}
