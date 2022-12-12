import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import ButtonImage from '../../../common/Buttons/ButtonImage';
import send from '../../../../assets/chat/send.png';
import smile from '../../../../assets/chat/smile.png';
import { store } from '../../../redux/redux-store';

const ChatInput = (props) => {

    const [message, setMessage] = useState('')

    const onChangeInput = (value) =>{
        setMessage(value)
    }

    const sendMessageHandler = () =>{
        if(message && message !== ''){
            store.chatManager.sendChatMessage(props.username, props.chatChanel, message)
            setMessage('')
        }
    }

    const openSmiles = () =>{

    }

    return (
        <ChatInputContainer>
            <ChatField placeholder='Press here to chat...'
                       placeholderTextColor='#838383'
                       value={message}
                       maxLength={100}
                       onChangeText={(value) => onChangeInput(value)} />
            
            <ButtonImage image={smile}
                         width={35}
                         height={35}
                         clickHandler={()=> openSmiles()}/>
            <ButtonImage image={send}
                         width={35}
                         height={35}
                         clickHandler={()=> sendMessageHandler()}/>
        </ChatInputContainer>
    )
}

const ChatInputContainer = styled.View`
    flex: .1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin: 0 10px;
    width: 95%;
    background-color: #0b61abb0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`
const ChatField = styled.TextInput`
    width: 70%;
    height: 50px;
    margin: 10px auto;
    padding: 5px 20px;
    color: #000;
    background-color: #d5dbe1;
    border-radius: 50px;
    justify-content: center;
`
export default ChatInput