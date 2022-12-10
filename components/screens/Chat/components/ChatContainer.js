import React, { useEffect } from 'react'
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ChatTabs from './ChatTabs';

const ChatContainer = () => {

    useEffect(()=>{
    },[])

    return (
        <ChatWrapper>
            <Container>
                <ChatTabs />
                <ChatMessages />
                <ChatInput />
            </Container>
        </ChatWrapper>
    )
}

const ChatWrapper = styled.View`
    flex: .9;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const Container = styled.View`
    flex: .9;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

export default ChatContainer