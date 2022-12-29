import C_ENTER_IN_CHAT from "../../protocol/messages/clients/chat/C_ENTER_IN_CHAT"
import C_SEND_MESSAGE from "../../protocol/messages/clients/chat/C_SEND_MESSAGE"
import EventDispatcher from "../../redux/EventDispatcher"
import eventsType from "../../redux/eventsType"
import image from '../../../assets/chat/tabs/group.png'
import clan from '../../../assets/chat/tabs/clan.png'
import { store } from "../../redux/redux-store"
import { addChatTab, cleanChatTabs } from "../../redux/reducers/chat/ChatReducer"
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";

class ChatManager {
    constructor(){

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
                this.addChatChanel(data.chatRoom, data.username)
                break;
            case 'S_SEND_MESSAGE':
                this.updateChatChanel(data.chatRoom, data.username, data.chatMessage, data.date, 'message')
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
                this.addChatTabs(roomChanel)
                return this.createNewChanel(roomChanel)
            }
            console.log('connect to chanel failed');
        }
    }

    addChatTabs = (roomChanel) =>{
        let chatTabs = {}
        switch (roomChanel) {
            case 'general':
                chatTabs = {
                    chanelName: roomChanel, 
                    image: image,
                    sortIndex: 0,
                }
                break;
            case 'clan':
                chatTabs = {
                    chanelName: roomChanel, 
                    image: clan,
                    sortIndex: 1,
                }
                break;
            default:
                break;
        }

        chatTabs && store.dispatch(addChatTab(chatTabs))
    }

    createNewChanel = (roomChanel) =>{
        if(roomChanel){
            this.chat.channels[roomChanel] = {
                unreadMessages: 0,
                messages: []
            }
            this.addInfoMessageStartChat(roomChanel)
            console.log('connect to chanel', roomChanel);
        }
    }

    updateChatChanel = (roomChanel, username, chatMessage, date, type) =>{
        if(this.chat.channels[roomChanel]){
            this.chat.channels[roomChanel].unreadMessages = this.chat.channels[roomChanel].unreadMessages + 1
            this.chat.channels[roomChanel].messages.push({
                username: username,
                chatMessage: chatMessage,
                date: date,
                type: type // privet, admin, info, etc
            })

            this.getAllUnreadMessages()
            EventDispatcher.publish(eventsType.UPDATE_CHAT_CHANELS, this.chat.channels)
        }
    }

    getAllUnreadMessages = () =>{
        let unread = 0

        if(this.chat.channels){
            Object.entries(this.chat.channels).forEach(([key, chanel])=>{
                unread += chanel.unreadMessages
            })
        }

        EventDispatcher.publish(eventsType.UPDATE_CHAT_UNREAD_MESSAGES, unread)
    }

    addInfoMessageStartChat = (roomChanel) =>{
        if(roomChanel) {
            const welcomeChat = selectTranslation(store.getState(),defaultTranslation.TR_WELCOME_IRC)
            this.updateChatChanel(roomChanel, 'info', welcomeChat,new Date(),'info')
        }
    }

    clearAllUnreadMessages = () =>{
        if(this.chat.channels){
            Object.entries(this.chat.channels).forEach(([key, chanel])=>{
                this.clearUnreadMessages(key)
            })
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

        store.dispatch(cleanChatTabs())
    }

}


export default ChatManager