import React, {memo, useEffect} from 'react'
import styled from 'styled-components';
import ButtonImage from '../../../common/Buttons/ButtonImage';
import send from '../../../../assets/chat/send.png';
import smile from '../../../../assets/chat/smile.png';
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import {store} from "../../../redux/redux-store";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";

const ChatInput = (props) => {

    const checkIsDeleteSmile = (newMessage) =>{
        const withEmojis = /\p{Extended_Pictographic}/ug

        let emoji = newMessage.match(withEmojis)
        if(emoji){
            return emoji.length
        }

        return emoji
    }

    const onChangeInput = (value) =>{

        const countEmoji = checkIsDeleteSmile(value)

        props.setMessageData({
            ...props.messageData,
            addEmojiCount: countEmoji && countEmoji !== null ? countEmoji : props.messageData.addEmojiCount,
            message: value
        })
    }

    const sendMessageHandler = () =>{
        if(props.messageData.message && props.messageData.message !== ''){
            let filteredMessage = props.messageData.message

            if(window.chatManager && window.chatManager.chat.filter){
                filteredMessage = window.chatManager.filterMessage(props.messageData.message);
            }

            const isInvalid = window.chatManager.validMessage(props.messageData.message)
            if(isInvalid){
                return props.setMessageData({openEmoji: props.messageData.openEmoji,addEmojiCount: 0,message: ''})
            }

            window.chatManager.sendChatMessage(props.username, props.chatChanel, filteredMessage)
            props.setMessageData({openEmoji: props.messageData.openEmoji,addEmojiCount: 0,message: ''})
        }
    }

    const openSmiles = () =>{
        props.setMessageData({...props.messageData, openEmoji: !props.messageData.openEmoji})
    }

    return (
        <ChatInputContainer>
            <ChatField placeholder={selectTranslation(store.getState(),defaultTranslation.TR_PLACEHOLDER)}
                       placeholderTextColor='#838383'
                       value={props.messageData.message}
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
    margin-bottom: 20px;
`
const ChatField = styled.TextInput`
    width: 70%;
    height: 80%;
    margin: 0 5px;
    padding: 5px 20px;
    color: #000;
    background-color: #d5dbe1;
    border-radius: 50px;
    justify-content: center;
`

export default memo(ChatInput)