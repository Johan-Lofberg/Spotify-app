import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ThemeProvider } from '@emotion/react'
import { themeOptions } from './theme/matrial.theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ThemeProvider theme={themeOptions}>
    <App />
   </ThemeProvider>
  </React.StrictMode>,
)
