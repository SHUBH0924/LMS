import React,{useState,useRef, useEffect} from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, ConversationHeader,Avatar,StarButton, InfoButton,  } from '@chatscope/chat-ui-kit-react';
import pic from '../User/programmer.png'
import Header from '../Header'
import io from 'socket.io-client'
import {useAuth} from '../../Auth/auth'
import {useParams} from 'react-router-dom'
import Courses from './Courses'
import {socket} from './Service/socket'

// const socket = io.connect(process.env.REACT_APP_SERVER)

const Discussion = () =>{
  
  const auth = useAuth()
  const token = auth.token
  const userName = auth.userName
  const {slug} = useParams()
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = message => {

    // console.log("handleSubmit",messages)
    // setMessages(messages=>[...messages, {     
      // message,
      // direction: 'outgoing',  
    // }]);
    const data = {
      user:userName,
      message,
      room:slug 
    }

    socket.emit('sendMessages',data)
    setMessages(messages=>[...messages,data]);
    setMsgInputValue("");
    inputRef.current.focus();
    // console.log("after handleSubmit",messages)
  };

  useEffect(()=>{
    socket.emit('join',slug)
    console.log("UserName:",userName)
  //   return () => {
  //     socket.off('join');
  //  };
  },[])

  useEffect(()=>{
      socket.off('receivedMessage').on('receivedMessage',(message)=>{
        console.log("received msg",message)
        console.log("all messages : ",messages)
        setMessages(messages=>[...messages,message]);
        // console.log(messages)
      });
      
      // socket.off('MY_EVENT', doThisOnlyOnce).on('MY_EVENT', doThisOnlyOnce);
      socket.off('allmessage').on('allmessage',(data)=>{
        console.log("allmessage",data)
        setMessages(data.messages);
      })

    //   return () => {
    //     socket.off('allmessage');
    //  };
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
                                </ConversationHeader.Actions>          
                                </ConversationHeader>
                                <MessageList scrollBehavior="smooth" >
                                  {/* {console.log("common",messages)} */}
                                  {
                                  messages.map((m, i) => {
                                    return(
                                      <Message key={i} model={m}>
                                        {/* <Message.Header sender="Emily" sentTime="just now" /> */}
                                        <Message.Header sender={(m.user===userName)?'You':m.user}  />
                                      </Message>
    
                                      )
                                  })
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