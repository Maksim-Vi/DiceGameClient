import C_ENTER_IN_CHAT from "../../protocol/messages/clients/chat/C_ENTER_IN_CHAT"
import C_SEND_MESSAGE from "../../protocol/messages/clients/chat/C_SEND_MESSAGE"
import EventDispatcher from "../../redux/EventDispatcher"
import eventsType from "../../redux/eventsType"

class ChatManager {
    constructor(){

        this.config = {}
        this.chat = {
            channels: {},
        }

        this.init()
    }

    init = () =>{

    }

    connectionToChatRoom = (chatRoom) =>{
        if(chatRoom){
            new C_ENTER_IN_CHAT(chatRoom)
        }
    }

    chatMassageHandler = (data) =>{
        switch (data.name) {
            case 'S_CHAT_ENTER':
                console.log('data',data)
                this.addChatChanel(data.chatRoom, data.username)
                break;
            case 'S_SEND_MESSAGE':
                this.updateChatChanel(data.chatRoom, data.username, data.chatMessage, data.date)
                break;
            default:             
                break;
        }
    }

    sendChatMessage = (username, chatRoom, chatMessage) =>{
        new C_SEND_MESSAGE(username, chatRoom, chatMessage)
    }

    addChatChanel = (roomChanel) =>{
        if(this.chat && this.chat.channels){
            if(!this.chat.channels[roomChanel]){
                return this.createNewChanel(roomChanel)
            }
            console.log('connect to chanel failed');
        }
    }

    createNewChanel = (roomChanel) =>{
        if(roomChanel){
            this.chat.channels[roomChanel] = {
                unreadMessages: 0,
                messages: []
            }
            console.log('connect to chanel', roomChanel);
        }
    }

    updateChatChanel = (roomChanel, username, chatMessage, date) =>{
        if(this.chat.channels[roomChanel]){
            this.chat.channels[roomChanel].unreadMessages += 1
            this.chat.channels[roomChanel].messages.push({
                username: username,
                chatMessage: chatMessage,
                date: date
            })
            
            EventDispatcher.publish(eventsType.UPDATE_CHAT_CHANELS, this.chat.channels)
        }
    }

    clearUnreadMessages = (roomChanel) =>{
        if(this.chat.channels[roomChanel]){
            this.chat.channels[roomChanel].unreadMessages = 0
        }
    }

    clearChatChanel = (roomChanel) =>{
        if(this.chat.channels[roomChanel]){
            this.chat.channels[roomChanel] = {
                unreadMessages: 0,
                messages: []
            }
        }
    }

    deleteChatChanel = (roomChanel) =>{
        if(this.chat.channels[roomChanel]){
            delete this.chat.channels[roomChanel];
        }
    }

    clearAllChanels = () =>{
        this.chat = {
            channels: {}
        }
    }

    testedManager = () =>{
        console.log('test chat Manager');
    }

}


export default ChatManager