import React, {memo, useState} from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ChatTabs from './ChatTabs';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import EmojisPanel from "./EmojisPanel/EmojisPanel";
import {Keyboard} from "react-native";

const ChatContainer = () => {

    const user = useSelector(state => state.players.myUser)
    const [messageData, setMessageData] = useState({
        openEmoji: false,
        addEmojiCount: 0,
        message: ''
    })

    const [keyboardStatus, setKeyboardStatus] = useState(false);

    React.useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    return (
        <ChatWrapper keyboardStatus={keyboardStatus}>
            <Container openEmoji={messageData.openEmoji}>
                <ChatTabs />
                <ChatMessages openEmoji={messageData.openEmoji} chatChanel={'general'}/>
                <ChatInput username={user.username}
                            chatChanel={'general'}
                            messageData={messageData}
                            setMessageData={setMessageData}
                />

                {messageData.openEmoji &&
                    <EmojisPanel messageData={messageData}
                                 setMessageData={setMessageData}
                    />
                }
            </Container>
        </ChatWrapper>
    )
}

const ChatWrapper = styled.View`
    flex: ${(props) => props.keyboardStatus ? '.65' : '.9' };

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const Container = styled.View`
    position: relative;
    flex: .9;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

export default memo(ChatContainer)