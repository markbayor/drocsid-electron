import React, { useContext, useState, useEffect } from 'react';
import { AxiosHttpRequest, setJwt } from '../../../utils'

import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { UserContext, UserDetailsType } from '../../../contexts/UserContext'
import { useHistory } from 'react-router-dom';

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [form] = Form.useForm()
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const getUser = (): void => {
    AxiosHttpRequest('GET', 'http://drocsid-web.herokuapp.com/auth/me')
      .then((data: UserDetailsType) => {
        setUser(data)
      })
      .catch(ex => {
        console.log(ex)
      })
  }

  const handleSignupAttempt = (values: SignupFormValues): void => {
    AxiosHttpRequest('POST', 'http://drocsid-web.herokuapp.com/auth/signup', values)
      .then((response: { data: string }) => {
        const token: string = response.data
        setJwt(token)
        getUser()
        history.push('/chats')
      })
      .catch(ex => {
        console.log(ex)
      })
  }

  return (
    <Form form={form} onFinish={handleSignupAttempt}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please enter a new username' }]}>
        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Username" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
        <Input.Password
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="submit">
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export { SignupForm }