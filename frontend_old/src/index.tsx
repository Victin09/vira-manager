import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import 'flowbite'

import './index.css'
import 'vira-design-system/dist/css/vira-design-system.css'
import 'vira-design-system/dist/js/vira-design-system.js'
import App from '@vira/app'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
