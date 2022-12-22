import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper';
import mainBg from '../../../assets/bg/main_bg.jpg'
import { StatusBar } from 'react-native';
import ChatContainer from './components/ChatContainer';

const ChatScreen = () => {


   return (
    <BackgroundWrapper gackground={mainBg}>
        <StatusBar hidden={true} style="light"/>
        
        <ChatContainer />
    </BackgroundWrapper>
   )
}



export default ChatScreen