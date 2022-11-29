import React,{useState,useRef, useEffect} from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, ConversationHeader,Avatar,StarButton, InfoButton,  } from '@chatscope/chat-ui-kit-react';
import pic from '../User/programmer.png'
import Header from '../Header'
import io from 'socket.io-client'
import {useAuth} from '../../Auth/auth'
import {useParams} from 'react-router-dom'
import Courses from './Courses'

const Discussion = () =>{

  const auth = useAuth()
  const token = auth.token
  const socket = io.connect(process.env.REACT_APP_SERVER,{
    query: { token }
  })
  const {slug} = useParams()
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = message => {

    console.log("handleSubmit",messages)
    setMessages([...messages, {     
      message,
      direction: 'ingoing',   
    }]);

    setMsgInputValue("");
    inputRef.current.focus();
    socket.emit('sendMessages',{ 
      message,
      room:slug   
    })
    console.log("after handleSubmit",messages)
  };

  useEffect(()=>{
    socket.emit('join',slug)
  },[])

  useEffect(()=>{
      socket.on('receivedMessage',(message)=>{
        console.log("before received msg",messages)
        setMessages([...messages, {     
          message,
          direction: 'ingoing',
        }])
        console.log("received msg",messages)
      })
  },[socket])


  return (
                <div style={{height: "100vh"}}>          
                    <Header />      
                    <MainContainer>
                    
                        <Courses courseId={slug}/>
                    
                        <ChatContainer>
                            <ConversationHeader>
                                <Avatar src={pic} name="Discussion" />
                                <ConversationHeader.Content userName="Discussion" info="" />
                                <ConversationHeader.Actions>
                                    {/* <VoiceCallButton /> */}
                                    {/* <VideoCallButton /> */}
                                    {/* <InfoButton /> */}
                                </ConversationHeader.Actions>          
                                </ConversationHeader>
                                <MessageList scrollBehavior="smooth" >
                                  {console.log("common",messages)}
                                  {
                                  messages.map((m, i) => {
                                    return(
                                      <Message key={i} model={m}>
                                        {/* <Message.Header sender="Emily" sentTime="just now" /> */}
                                        <Message.Header sender="Emily" sentTime="just now" />
                                      </Message>
    
                                      )
                                  })
                                  // <Message model={{
                                  //   message: "Hello my friend",
                                  //   sentTime: "just now",
                                  //   sender: "Joe"
                                  // }}>
                                  //         <Message.Header sender="Emily" sentTime="just now" />
                                  //       </Message>
                                  }
                                </MessageList>
                                <MessageInput placeholder="Type message here" onSend={handleSend} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef} />
                      </ChatContainer>
                      </MainContainer>
                </div>
                // <>
                //   <input placeholder="Message" />
                //   <button onClick={sendMessage}>Send</button>
                // </>
              
                )
}

export default Discussion