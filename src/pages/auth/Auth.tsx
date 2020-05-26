/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { LoginForm } from './forms/LoginForm'
import { SignupForm } from './forms/SignupForm'

import { Layout } from 'antd'
const { Content, Footer } = Layout;


function Auth(): JSX.Element {
  return (
    <Layout className='auth-page_container'>
      <div>
        <Content className='auth-page-content_container'>
          <h1 className='auth-welcome_message'>Welcome to Drocsid! Log in or sign up!</h1>
          <div className='auth-forms_container' style={{ display: 'flex' }}>
            <div className='login-form_container'>
              <h2>Log in</h2>
              <LoginForm />
            </div>
            <div className='signup-form_container'>
              <h2>Sign up</h2>
              <SignupForm />
            </div>
          </div>
        </Content>
        <Footer>
        </Footer>
      </div>
    </Layout>
  )
}

export default Auth