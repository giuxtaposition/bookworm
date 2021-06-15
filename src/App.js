import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Library from './components/Library/Library'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div className='App'>
        <Header />
        <Library />
      </div>
    </ChakraProvider>
  )
}

export default App
