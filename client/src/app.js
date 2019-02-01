// This is the main app page
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav.js';
import Account from './components/Account.js';
import Default from './components/Default.js';
import Editor from './components/Editor.js';
import AccountAccess from './components/AccountAccess';

const App = () => (
  <div>
    {/* Displays nav component */}
    <Nav/>
    <Switch>
      {/* Home page is the account page that displays the user's account info & code*/}
      <Route exact path="/" component={Account}/>
      {/* Editor page allows users to mess with code */}
      <Route path="/editor" component={Editor}/>
      {/* Account Access page allows user to gain access or create account */}
      <Route path="/signIn" component={AccountAccess}/>
      <Route component={Default}/>
    </Switch>
  </div>
)

export default App