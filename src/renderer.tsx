// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MemoryRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

import 'antd/dist/antd.css';
import './index.css'

import { getUser } from './utils'
// eslint-disable-next-line import/no-unresolved
import Auth from './pages/auth/Auth'
import ChatsPage from './pages/chats/ChatsPage'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserContext } from './contexts/user/UserContext'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatsContext } from './contexts/chats/ChatsContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FriendsContext } from './contexts/friends/FriendsContext'

import { chatsReducer } from './contexts/chats/chatsReducer';
import friendsReducer from './contexts/friends/friendsReducer';





// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App = (): JSX.Element => {
  const [user, setUser] = useState(undefined)

  const [chatsState, chatsDispatch] = useReducer(chatsReducer, null)
  const [friendsState, friendsDispatch] = useReducer(friendsReducer, null)

  useEffect(() => {
    getUser(setUser)
  }, [])


  return (
    <Router>
      <div className='app_container'>
        <UserContext.Provider value={{ user, setUser }}>
          <FriendsContext.Provider value={{ friendsState, friendsDispatch }}>
            <ChatsContext.Provider value={{ chatsState, chatsDispatch }}>

              <div>Hello world!</div>
              <button onClick={(): void => console.log(user)}></button>
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



