import { LockOutlined, UserOutlined,LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css'
import { Button, Form, Input,Spin } from 'antd';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserData } from '../types/auth';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { fetchLogin } from '../store/api/auth.api';

const LogIn: React.FC = () => {
    const isAuth = useSelector((state:RootState)=>state.auth.isAuth)
    const loading = useSelector((state:RootState)=>state.auth.isLoading)
    const err = useSelector((state:RootState)=>state.auth.errorLogin)
    const appDispatch = useAppDispatch()

    const {
        register,
    } = useForm()


    const loginHandler = async (data:UserData) => {
        await appDispatch(fetchLogin(data))
    }
    
 
    if(isAuth){
        return <Navigate to='/'/>
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 22, color: 'white' }} spin />

  return (
    <>
        <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
            <h1 className='mb-5'>Вход</h1>
            <div className='border p-5'>
                <h6 className='text-danger text-center mb-3'>{err ? `${err}` : ''}</h6>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={loginHandler}
                >
                    <Form.Item
                        {...register('email')}
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Email"
                        type='email' />
                    </Form.Item>
                    <Form.Item
                        {...register('password')}
                        rules={[{ required: true, message: 'Please input your Password!'}]}
                    >
                        <Input.Password 
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <Button type="primary" htmlType="submit" className="login-form-button me-3 w-100 mb-1">
                            {loading ? <Spin indicator={antIcon} /> : 'Войти'}
                            </Button>
                            <span>
                                или <Link to='/register'><a className='ms-1'>Зарегистрироваться</a></Link>
                            </span>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>
    
  );
};

export default LogIn;