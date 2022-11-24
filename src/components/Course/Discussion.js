import React,{useState,useRef} from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, ConversationHeader,Avatar,StarButton, InfoButton,  } from '@chatscope/chat-ui-kit-react';
import pic from '../User/programmer.png'
import Header from '../Header'
const Discussion = () =>{

    const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = message => {
    setMessages([...messages, {
      message,
      direction: 'outgoing'
    //   direction: 'incoming'
    }]);
    setMsgInputValue("");
    inputRef.current.focus();
  };

  return (
                <div style={{height: "100vh"}}>          
                    <Header />      
                    <MainContainer>
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
                                  {messages.map((m, i) => <Message key={i} model={m} />)}
                                </MessageList>
                                <MessageInput placeholder="Type message here" onSend={handleSend} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef} />
                      </ChatContainer>
                      </MainContainer>
                </div>)
}

export default Discussion