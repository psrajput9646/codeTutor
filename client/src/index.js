import React from 'react'
import { render } from 'react-dom'
import App from './app.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#Root')

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  target
)
