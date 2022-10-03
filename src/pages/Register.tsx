import { LockOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css'
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserData } from '../types/auth';
import { fetchRegister } from '../store/api/auth.api';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';

const Register: React.FC = () => {
    let err = useSelector((state:RootState)=>state.auth.error)
    const navigate = useNavigate()
    const appDispatch = useAppDispatch()

    const {
        register,
    } = useForm()


    const registerHandler = async (data:UserData) => {
        await appDispatch(fetchRegister(data))
        if(err){
            navigate('/register')
        } else{
            navigate('/login')
        }
    }

  return (
    <>
        <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
            <h1 className='mb-5'>Регистрация</h1>
            <div className='border p-5'>
                <h6 className='text-danger text-center mb-3'>{err ? `${err}` : ''}</h6>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }} 
                onFinish={registerHandler}
                >
                    <Form.Item
                        {...register('email')}
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        type='email' 
                        placeholder="Email"
                         />
                    </Form.Item>
                    <Form.Item
                        {...register('password')}
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password 
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item >
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <Button  type="primary" htmlType="submit" className="login-form-button me-3 w-100 mb-1">
                            Зарегистрироваться
                            </Button>
                            <span>
                                <Link to='/login'><a>Уже есть аккаунт?</a></Link>
                            </span>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>
);
};

export default Register;