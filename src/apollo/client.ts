import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { RetryLink } from 'apollo-link-retry'
import { WebSocketLink } from 'apollo-link-ws'
import { split, from } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { OperationDefinitionNode } from 'graphql'
import { ApolloClient } from 'apollo-client'

const cache = new InMemoryCache()
const isProduction = (process.env.NODE_ENV as string) === 'production'
const httpServer = isProduction
  ? 'https://dev.stenstroem.dk'
  : 'http://localhost:5000/graphql'
const wsServer = isProduction
  ? 'https://dev.stenstroem.dk'
  : 'http://localhost:5000/graphql'

const httpLink = createUploadLink({
  uri: httpServer,
  credentials: 'include',
})
const retryLink = new RetryLink()

const wsLink = new WebSocketLink({
  uri: wsServer,
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }): boolean => {
    const { kind, operation } = getMainDefinition(
      query
    ) as OperationDefinitionNode
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  from([retryLink, httpLink])
)

export const client = new ApolloClient({
  cache,
  link,
})
