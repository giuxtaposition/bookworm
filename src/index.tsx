import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { ColorModeScript } from '@chakra-ui/react'
import { createUploadLink } from 'apollo-upload-client'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import theme from './components/theme'
import './index.css'

let httpLinkUri = ''
let wsLinkUri = ''

if (process.env.NODE_ENV !== 'production') {
    httpLinkUri = 'http://localhost:4000/graphql'
    wsLinkUri = 'ws://localhost:4000/graphql'
} else {
    httpLinkUri = 'https://bookworm.giuxtaposition.tech/graphql'
    wsLinkUri = 'wss://bookworm.giuxtaposition.tech/graphql'
}

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('bookworm-user-token')
    const username = localStorage.getItem('bookworm-user')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
            username: username ? username : null,
        },
    }
})

const httpLink = createUploadLink({
    uri: httpLinkUri,
    headers: {
        'keep-alive': 'true',
    },
})

const wsLink = process.browser
    ? new WebSocketLink({
          uri: wsLinkUri,
          options: {
              reconnect: true,
              connectionParams: {
                  authorization: localStorage.getItem('bookworm-user-token'),
                  username: localStorage.getItem('bookworm-user'),
                  url: httpLinkUri.replace('/graphql', ''),
              },
          },
      })
    : null

const splitLink = process.browser
    ? split(
          ({ query }) => {
              const definition = getMainDefinition(query)
              return (
                  definition.kind === 'OperationDefinition' &&
                  definition.operation === 'subscription'
              )
          },
          wsLink ?? httpLink,
          authLink.concat(httpLink)
      )
    : httpLink

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                merge: true,
            },
            Book: {
                merge: false,
            },
        },
    }),
    link: splitLink,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
)
