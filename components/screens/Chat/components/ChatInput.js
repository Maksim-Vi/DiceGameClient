import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import ButtonWithText from '../../../common/Buttons/ButtonWithText';
import { store } from '../../../redux/redux-store';

const ChatInput = (props) => {

    const [message, setMessage] = useState('')

    const onChangeInput = (value) =>{
        setMessage(value)
    }

    const sendMessageHandler = () =>{
        store.chatManager.sendChatMessage(props.username, props.chatChanel, message)
        setMessage('')
    }

    return (
        <ChatInputContainer>
            <ChatField placeholder='tap to her =)'
                       placeholderTextColor='#838383'
                       value={message}
                       onChangeText={(value) => onChangeInput(value)} />
            
            <ButtonWithText text={'send'} 
                            width={'50px'}
                            height={'50px'}
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
    background-color: rgba(220, 220, 220, 0.73);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`
const ChatField = styled.TextInput`
    width: 80%;
    height: 50px;
    margin: 10px auto;
    padding: 5px 20px;
    color: #c6c6c6;
    background-color: #404040;
    border-radius: 50px;
    justify-content: center;
    border: 2px solid rgb(255,157,77);
`
export default ChatInput