import * as React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client'

const root = document.getElementById('root')
if (root) {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    root
  )
}
