import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';
import { Navigate } from 'react-router-dom';

import SubMenu from 'antd/es/menu/SubMenu';
import { Avatar, Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;

export const LayoutPrivate = ({ children }) => {
    
    const { user:{user}, dispatch } = useContext( AuthContext );

    const handleLogOut = () => {
        return(
            localStorage.removeItem('logged'),
            dispatch({
                type: types.logout
            }),
            <Navigate to="/sign-in" />
        )
    }
    
    return (
        <Layout className="wrapper">
            <Header className='header' >
                <Menu
                    mode="horizontal"
                    className='header-menu'
                >
                    <Menu.Item key={1}>
                        <span className="logo"> Todo List </span>
                    </Menu.Item>
                    <SubMenu 
                        key={2}
                        title={ 
                            <span> 
                                <Avatar className='avatar'> {user.name[0]}{user.name[1]} </Avatar> {user.name}
                            </span> 
                        } 
                    >
                        <Menu.Item key="4" onClick={handleLogOut}> <LogoutOutlined /> Salir </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
            
            <Content className='content'>
                {children}
            </Content>
        </Layout>
    )
}
