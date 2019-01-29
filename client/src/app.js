// This is the main app page
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Testing from './components/Testing'

const App = () => (
  <div>
    {Testing}
    <h1>hi</h1>
    <Button color="danger">Danger!</Button>
  </div>
)

export default App