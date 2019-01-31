// This is the main app page
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav.js';
import Account from './components/Account.js';
// import Tabs from './components/Tabs.js';
import Default from './components/Default.js';


const App = () => (
  <div>
    <Nav/>
    <Switch>
      <Route exact path="/" component={Account}/>
      {/* <Route path="/tabs" component={Tabs}/> */}
      <Route component={Default}/>
    </Switch>
  </div>
)

export default App
