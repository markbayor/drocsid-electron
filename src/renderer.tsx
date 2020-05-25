import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

import 'antd/dist/antd.css';
import './index.css'

import { AxiosHttpRequest, getUser } from './utils'
// eslint-disable-next-line import/no-unresolved
import Auth from './pages/auth/Auth'
import ChatsPage from './pages/chats/ChatsPage'

import { UserContext } from './contexts/user/UserContext'
import { ChatsContext } from './contexts/chats/ChatsContext';
import { FriendsContext } from './contexts/friends/FriendsContext'

import { chatsReducer } from './contexts/chats/chatsReducer';
import friendsReducer from './contexts/friends/friendsReducer';





const App = (): JSX.Element => {
  const [user, setUser] = useState(undefined)

  const [chatsState, chatsDispatch] = useReducer(chatsReducer, null)
  const [friendsState, friendsDispatch] = useReducer(friendsReducer, null)

  useEffect(() => {
    getUser(setUser)
  }, [])

  // ////////////////
  async function attemptLogin(): Promise<void> { // TESTING
    await AxiosHttpRequest('POST', 'http://drocsid-web.herokuapp.com/auth/login', { email: 'admin@gmail.com', password: 'admin' }).then(data => {
      console.log(data)
      window.localStorage.setItem('data', data.data)
      return data
    }).then(data => {
      const log = window.localStorage.getItem('data')
      console.log(log)
    })
  }
  /////////////////

  return (
    <Router>
      <div className='app_container'>
        <UserContext.Provider value={{ user, setUser }}>
          <FriendsContext.Provider value={{ friendsState, friendsDispatch }}>
            <ChatsContext.Provider value={{ chatsState, chatsDispatch }}>

              <div>Hello world!</div>
              <button onClick={() => console.log(user)}></button>
              <button onClick={attemptLogin}>Login</button>
              <div>
                <Link to='/'>Main</Link>
                <Link to='/auth'>Auth</Link>
                <Link to='/chats'>Chats</Link>
              </div>

              <Switch>
                <Route exact path='/auth' component={Auth} />
                <Route exact path='/chats' component={ChatsPage} />
                <Redirect to='/' />
              </Switch>

            </ChatsContext.Provider>
          </FriendsContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));



