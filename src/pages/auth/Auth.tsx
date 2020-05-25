import React from 'react'

import { LoginForm } from './forms/LoginForm'
import { SignupForm } from './forms/SignupForm'

import { Layout } from 'antd'
import { formatCountdown } from 'antd/lib/statistic/utils';
const { Content, Footer } = Layout;


function Auth(): JSX.Element {
  return (
    <Layout className='auth-page_container'>
      <Content className='auth-page-content_container'>
        <h1>Welcome to Drocsid! Log in or sign up!</h1>
        <div className='auth-forms_container'>
          <div className='login-form_container'>
            <LoginForm />
          </div>
          <div className='signup-form_container'>
            <SignupForm />
          </div>
        </div>
      </Content>
      <Footer>
      </Footer>
    </Layout>
  )
}

export default Auth