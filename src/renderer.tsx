import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

// eslint-disable-next-line import/no-unresolved
import Auth from './pages/Auth'
// eslint-disable-next-line import/no-unresolved
import ChatsPage from './pages/ChatsPage'

const App = (): JSX.Element => {
  return (
    <Router>
      <div>Hello world!</div>
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
    </Router>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));



