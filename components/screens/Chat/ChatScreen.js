import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper';
import { StatusBar } from 'react-native';
import ChatContainer from './components/ChatContainer';
import SlideScreen from "../../common/AnimationScreens/SlideScreen";

const ChatScreen = () => {


   return (
    <BackgroundWrapper>
        <SlideScreen left={false}>
            <StatusBar hidden={true} style="light"/>
        
            <ChatContainer />
        </SlideScreen>
    </BackgroundWrapper>
   )
}



export default ChatScreen