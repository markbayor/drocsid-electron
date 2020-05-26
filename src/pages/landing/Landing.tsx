/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/user/UserContext'

const Landing = (): JSX.Element => {

  const { user } = useContext(UserContext)

  console.log('USER IND LANDING', user)

  return (
    <div>
      <h1 style={{ color: 'white' }}>Re-think chatting</h1>
      <h2 style={{ color: 'white' }}>Welcome to Drøcsid</h2>
      {/* <img src='../../assets/00223-Spiral-gear-logo-design-free-logos-online-01.png' />  TODO*/}
      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <Link to='/auth'>Log in</Link>
        {'   '}
        {user && user.id && <Link to='/chats'>Go to your chats</Link>}
      </div>
    </div>
  )
}

export default Landing