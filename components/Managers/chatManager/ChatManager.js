import C_ENTER_IN_CHAT from "../../protocol/messages/clients/chat/C_ENTER_IN_CHAT"

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
                this.addChatChanel(data.room, data.username)
                break;
            case 'S_SEND_MESSAGE':
                console.log('S_SEND_MESSAGE', data);
                this.updateChatChanel()
                break;
            default:             
                break;
        }
    }

    addChatChanel = (roomChanel) =>{
        if(this.chat && this.chat.channels){
            if(!this.chat.channels[roomChanel]){
                return this.createNewChanel(roomChanel)
            }

            return this.updateChatChanel(roomChanel)
        }
    }

    createNewChanel = (roomChanel) =>{
        this.chat.channels[roomChanel] = {
            unreadMessages: 0,
            messages: []
        }
        console.log('connect to chanel', roomChanel, this.chat.channels);
    }

    updateChatChanel = (roomChanel) =>{

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