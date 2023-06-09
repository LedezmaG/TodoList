import React from 'react'
import { Col, Layout, Row } from 'antd';
import dividerVertical from '../assets/divider-round-vertical.svg'

const { Content } = Layout;

export const LayoutPublic = ({ children }) => {
    return (
        <Layout className="wrapper">
            <Content className='content'>
                <Row className='content-auth'>
                    <Col sm={0} md={10} id='auth-section' >
                        <img src={dividerVertical} alt='divider' className='vertical-divider' />
                    </Col>
                    <Col  sm={44} md={14} >
                        <div className='auth-content'>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}
