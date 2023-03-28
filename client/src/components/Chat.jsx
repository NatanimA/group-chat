import { ApolloClient, InMemoryCache, ApolloProvider, gql,useQuery } from '@apollo/client';
import React,{useState} from 'react'
import Messages from './Messages';
import { Button, Col, Container, FormInput, Row} from 'shards-react'

const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache(),
    });

const Chat = () => {
  const [state,setState] = useState({user:'Neo',content:''})
  return (
    <Container>
        <Messages user={state.user} />
        <Row>
          <Col xs={2} style={{padding:0}}>
              <FormInput
                label="user"
                value={state.user}
                onChange={(evt) => setState({...state,user:evt.target.value})}
              />
          </Col>

          <Col xs={8} >
              <FormInput
                label="content"
                value={state.content}
                onChange={(evt) => setState({...state,content:evt.target.value})}
              />
          </Col>
          <Col xs={2} style={{padding:0}}>
            <Button>
              Send
            </Button>
          </Col>
        </Row>
    </Container>
  )
}

export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
)
