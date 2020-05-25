import React, { useContext } from 'react';
import { AxiosHttpRequest, setJwt, getUser } from '../../../utils'

import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { UserContext, UserDetailsType } from '../../../contexts/user/UserContext'
import { useHistory } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [form] = Form.useForm()
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const handleLoginAttempt = (values: LoginFormValues): void => {
    AxiosHttpRequest('POST', 'http://drocsid-web.herokuapp.com/auth/login', values)
      .then((response: { data: string }) => {
        const token: string = response.data
        setJwt(token)
        getUser(setUser)
        history.push('/chats')
      })
      .catch(ex => {
        console.log(ex)
      })
  }

  return (
    <Form form={form} onFinish={handleLoginAttempt}>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
        <Input.Password
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          autoComplete="current-password"
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="remember">
        <Button type="primary" htmlType="submit" className="login-form__submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export { LoginForm }