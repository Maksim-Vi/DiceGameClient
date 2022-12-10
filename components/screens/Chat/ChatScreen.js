import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper';
import mainBg from '../../../assets/bg/main_bg.jpg'
import { StatusBar } from 'react-native';
import styled from 'styled-components';

const ChatScreen = () => {


   return (
    <BackgroundWrapper gackground={mainBg}>
        <StatusBar hidden={true} style="light"/>
        <ChatContainer>

        </ChatContainer>
    </BackgroundWrapper>
   )
}

const ChatContainer = styled.View`
  flex: 1;
`

export default ChatScreen