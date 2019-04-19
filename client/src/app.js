// This is the main app page
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav.js';
import Home from './components/Home.js';
import Account from './components/Account.js';
import Default from './components/Default.js';
import Editor from './components/Editor.js';
import AccountAccess from './components/AccountAccess';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => (
  <div>
    {/* Displays nav component */}
    <Nav/>
    <Switch>
      {/* Home is the page that displays a feed of all ongoing projects */}
      <PrivateRoute exact path="/" component={Home}/>
      {/* Account is the account page that displays the user's account info & code*/}
      <PrivateRoute path="/account/:userId?" component={Account}/>
      {/* Editor page allows users to mess with code */}
      <PrivateRoute path="/editor" component={Editor}/>
      {/* Account Access page allows user to gain access or create account */}
      <Route path="/signIn" component={AccountAccess}/>
      <PrivateRoute component={Default}/>
    </Switch>
  </div>
)

export default App