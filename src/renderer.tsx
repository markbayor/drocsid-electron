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
import { UserContext, UserDetailsType } from './contexts/user/UserContext'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatsContext, ChatsContextType } from './contexts/chats/ChatsContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FriendsContext, FriendsContextType } from './contexts/friends/FriendsContext'

import { chatsReducer, initialChatsState } from './contexts/chats/chatsReducer';
import { friendsReducer, initialFriendsState } from './contexts/friends/friendsReducer';




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App = (): JSX.Element => {
  const [user, setUser] = useState({} as UserDetailsType)

  const [chatsState, chatsDispatch] = useReducer(chatsReducer, initialChatsState)
  const [friendsState, friendsDispatch] = useReducer(friendsReducer, initialFriendsState)

  useEffect(() => {
    getUser(setUser)
  }, [])

  const isLoggedIn = !!user.id

  return (
    <Router>
      <div className='app_container'>
        <UserContext.Provider value={{ user, setUser }}>
          <FriendsContext.Provider value={{ friendsState, friendsDispatch }}>
            <ChatsContext.Provider value={{ chatsState, chatsDispatch }}>
              <Switch>
                {/* <Route exact path='/landing' component={Landing} /> */}
                {isLoggedIn && <Route exact path='/chats' component={ChatsPage} />}
                <Route exact path='/auth' component={Auth} />
                {!isLoggedIn && <Redirect to='/chats' />}
                {!isLoggedIn && <Redirect to='/auth' />}
              </Switch>
            </ChatsContext.Provider>
          </FriendsContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));



