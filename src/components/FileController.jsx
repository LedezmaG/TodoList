import React from 'react'
import { ErrorMessage, Field } from 'formik'

export const FileController = ({ type, ...props }) => {
    if (type === 'text') {
        return (
            <div className='field-content'>
                { props.label && <label htmlFor={ props.name } className='field-label'>{ props.label }</label> }
                <Field 
                    type="text" 
                    name={props.name} 
                    placeholder={props.placeholder} 
                    className={`field ${props.size}`}
                />
                <ErrorMessage name={ props.name } component="small" className='field-error' />
            </div>
        )
    }
    if (type === 'password') {
        return (
            <div className='field-content'>
                { props.label && <label htmlFor={ props.name } className='field-label' >{ props.label }</label> }
                <Field 
                    type="password" 
                    name={props.name} 
                    placeholder={props.placeholder} 
                    className={`field ${props.size}`}
                />
                <ErrorMessage name={ props.name } component="small" className='field-error' />
            </div>
        )
    }
}
