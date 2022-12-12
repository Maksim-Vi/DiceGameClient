import React from 'react'
import styled from 'styled-components';
import Text from '../../../common/Text/Text';
import EventDispatcher from '../../../redux/EventDispatcher';
import eventsType from '../../../redux/eventsType';

// const ChatMessages = (props) => {

//     const [chanelData, setChanelData] = useState(null)

//     const updateChatChanelsMessage = (data) =>{
//         if(data[props.chatChanel]){
//             setChanelData(data[props.chatChanel])
//             window.chatManager.clearUnreadMessages(props.chatChanel)
//         }
//     }

//     useEffect(() => {
//         const subscriber = EventDispatcher.subscribe(eventsType.UPDATE_CHAT_CHANELS, updateChatChanelsMessage)

//         return () => {
//             EventDispatcher.unsubscribe(subscriber)
//         }
//     }, [])

//     useEffect(()=>{
//         console.log('chanelData',chanelData);
//     },[chanelData])
    

    // return (
    //     <ChatMessagesContainer>
    //         {chanelData &&
    //             chanelData.messages.map((mess, index) => {
    //                 return <MessageContainer key={index}>
    //                     <Text madium heavy color={'black'}>{mess.username}: </Text><Text color={'black'}>{mess.chatMessage}</Text>
    //                 </MessageContainer>
    //             })
    //         }
    //     </ChatMessagesContainer>
    // )
// }

class ChatMessages extends React.Component {
    constructor(props){
        super(props)

        this.subscriber = null
        this.state = {
            chanelData: null
        }
    }

    componentDidMount(){
        this.subscriber = EventDispatcher.subscribe(eventsType.UPDATE_CHAT_CHANELS, this.updateChatChanelsMessage)
    }

    componentDidUpdate(nextProps, nextState){
        return this.state.chanelData !== nextState.chanelData
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
            <ChatMessagesContainer>
                {this.state.chanelData &&
                    this.state.chanelData.messages.map((mess, index) => {
                        return <MessageContainer key={index}>
                            <Text madium heavy color={'black'}>{mess.username}: </Text><Text color={'black'}>{mess.chatMessage}</Text>
                        </MessageContainer>
                    })
                }
            </ChatMessagesContainer>
        )
    }
}

const ChatMessagesContainer = styled.View`
    flex: .7;
    justify-content: flex-end;
    width: 95%;
    height: 100%;
    background-color: rgba(220, 220, 220, 0.73);
`
const MessageContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    width: 70%;
    height: 50px;
    border-radius: 10px;
`

export default ChatMessages