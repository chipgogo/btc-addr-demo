import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import Theme, { FixedGlobalStyle } from './theme'

ReactDOM.render(
  <React.StrictMode>
    <FixedGlobalStyle />
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
)
