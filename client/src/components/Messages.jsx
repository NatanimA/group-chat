import React, { useEffect,useState } from 'react'
import { useQuery,useSubscription } from '@apollo/client'
import { GET_MESSAGES } from './queries'
import { Container, Row,Col, FormInput,Button } from 'shards-react'
import {MESSAGE_SUBSCRIPTION} from './queries'

const Messages = ({user}) => {
  const {data,subscribeToMore} = useQuery(GET_MESSAGES)
  const[messages,setMessages] = useState([])
  const subscription = useSubscription(MESSAGE_SUBSCRIPTION)
  useEffect(() => {
    if(data?.messages !== undefined){
        setMessages(data.messages)
    }
  },[data])
  subscribeToMore({
    document: MESSAGE_SUBSCRIPTION,
    updateQuery:(prev,{subscriptionData}) => {
        if(!subscriptionData.data) return prev
        const newMessage = subscriptionData.data.messageNotification;
        let m = [...messages];
        m.push(newMessage)
        setMessages(m)
    }
  })

  console.log("MESSAGES: ", messages)

  return (
    <div>
        {messages && messages.length > 0 ? messages.map((message) => (
            <div key={message.id} style={{display:'flex',justifyContent: user === message?.user ? 'right' : 'left',width:'100%'}}>
                {user !== message.user ?
                    <div
                        style={{
                            height:50,
                            width:50,
                            marginRight: '0.5em',
                            border: '2px solid #e5e6ea',
                            borderRadius:25,
                            textAlign:'center',
                            fontSize:'18px',
                            padding:'0.5em'
                        }}
                    >
                        {message.user.slice(0,2)}
                    </div>
                    :''}
                <div style={{
                    background: user === message?.user ? '#58bf56' : '#e5e6ea',
                    color: user === message?.user ? '#fff' : '#000',
                    padding:'1em',
                    borderRadius:'1em',
                    width: '60%',
                    margin: '1rem 0'
                    }}>
                    {message.content}
                </div>
            </div>
        ))
        : <span>No messages found</span>
        }
    </div>
  )
}

export default Messages
