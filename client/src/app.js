// This is the main app page
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Nav from './components/Nav.js';
import Account from './components/Account.js';

const App = () => (
  <div>
    <Nav/>
    <Account/>
  </div>
)

export default App
