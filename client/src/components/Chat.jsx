import { ApolloClient, InMemoryCache, ApolloProvider, gql,useQuery } from '@apollo/client';
import React from 'react'
import Messages from './Messages';
import { Container} from 'shards-react'

const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache(),
    });

const Chat = () => {

  return (
    <Container>
        <Messages user='Neo' />
    </Container>
  )
}

export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
)
