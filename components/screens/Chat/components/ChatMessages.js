import React, {memo} from 'react'
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import EventDispatcher from '../../../redux/EventDispatcher';
import eventsType from '../../../redux/eventsType';
import Message from './Message/Message';
import ChatMassagesController from "./Controllers/ChatMessagesController";

class ChatMessages extends React.Component {
    constructor(props){
        super(props)

        this.scrollView = null
        this.subscriber = null

        this.state = {
            chanelData: window.chatManager.chat.channels[this.props.chatChanel] || null
        }

        this.ChatMassagesController = new ChatMassagesController()
    }

    componentDidMount(){
        this.subscriber = EventDispatcher.subscribe(eventsType.UPDATE_CHAT_CHANELS, this.updateChatChanelsMessage)
    }

    componentWillUnmount(){
        EventDispatcher.unsubscribe(this.subscriber)
    }

    updateChatChanelsMessage = (data) =>{
        if(data[this.props.chatChanel]){
            this.setState({
                chanelData: data[this.props.chatChanel]
            })
            window.chatManager.clearUnreadMessages(this.props.chatChanel)
        }
    }

    render(){
        return (
            <ChatMessagesContainer openEmoji={this.props.openEmoji}>
                <ChatScroll ref={ref => {this.scrollView = ref}}
                            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                            showsVerticalScrollIndicator={true} 
                            contentContainerStyle={styles.scroll}>
                    <ChatScrollContainer>
                        {this.state.chanelData &&
                            this.state.chanelData.messages.map((mess, index) => {
                                return this.ChatMassagesController.hendlerMessagesChat(mess, index)
                            })
                        }
                    </ChatScrollContainer>
                </ChatScroll>
               
            </ChatMessagesContainer>
        )
    }
}

const ChatMessagesContainer = styled.View`
    flex: ${(props) => props.openEmoji ? '.3' : '.7' };
    width: 95%;
    height: 100%;
    background-color: #0b61abb0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`
const ChatScroll = styled.ScrollView`
  display: flex;
`

const ChatScrollContainer = styled.View`
    justify-content: flex-end;
`
const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
        flexGrow: 1, 
        justifyContent: 'flex-end'
    }
})

export default memo(ChatMessages)