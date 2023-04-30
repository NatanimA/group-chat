import { ApolloClient, InMemoryCache, ApolloProvider,split,HttpLink,useMutation } from '@apollo/client';
import React,{useState} from 'react'
import Messages from './Messages';
import { Button, Col, Container, FormInput, Row} from 'shards-react'
import { POST_MESSAGES } from './queries';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities';
import SideBar from "./SideBar/SideBar"


import "./Chat.scss"

const wsLink = new GraphQLWsLink(createClient({
  url:'ws://localhost:9000/graphql'
}))

const httpLink = new HttpLink({
  uri:'http://localhost:9000/graphql',
});

const splitLink = split(
  ({query}) => {
    const definition =getMainDefinition(query);
    return(
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
)


const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    });

const Chat = () => {
  const [state,setState] = useState({user:'Neo',content:''})
  const [postMessage,{data,loading,error}] = useMutation(POST_MESSAGES)

  const onSend = () => {
    if(state.content.length < 0) return
    const {user,content} = state
    console.log(state)
    postMessage({variables:{user,content}})
    setState({
      ...state,
      content:''
    })
  }
  return (
    <>
      <SideBar />
      <Container className="app__chat__container">
        <Messages user={state.user} />
        <Row className="app__chat__form_input">
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
                onKeyUp = {((evt) => {
                  if(evt.keyCode === 13){
                    onSend()
                  }
                })}
              />
          </Col>
          <Col xs={2} style={{padding:0}}>
            <Button onClick={() => onSend()}>
              Send
            </Button>
          </Col>
        </Row>
    </Container>

    </>

  )
}

export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
)
