import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Library from './components/Library/Library'
import Stats from './components/Stats/Stats'
import { ChakraProvider } from '@chakra-ui/react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <ChakraProvider>
        <div className='App'>
          <Header />

          <Switch>
            <Route exact path='/'></Route>

            <Route path='/library'>
              <Library />
            </Route>
            <Route path='/stats'>
              <Stats />
            </Route>
          </Switch>
        </div>
      </ChakraProvider>
    </Router>
  )
}

export default App
