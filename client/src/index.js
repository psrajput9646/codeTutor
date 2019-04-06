import React from 'react'
import { render } from 'react-dom'
import App from './app.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/store'

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#Root')

render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  target
)
