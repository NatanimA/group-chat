import React, { useEffect,useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MESSAGES } from './queries'

const Messages = ({user}) => {
  const {data} = useQuery(GET_MESSAGES())
  const[messages,setMessages] = useState([])
  console.log(data.messages)

  return (
    <div>
        {data?.messages && data?.messages.length > 0 ?  data?.messages.map((message) => (
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
                    maxWidth: '100%'
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
