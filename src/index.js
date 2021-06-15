import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { LibraryContextProvider } from './context/index'
import theme from './components/theme'
import { ColorModeScript } from '@chakra-ui/react'

ReactDOM.render(
  <LibraryContextProvider>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </React.StrictMode>
  </LibraryContextProvider>,
  document.getElementById('root')
)
