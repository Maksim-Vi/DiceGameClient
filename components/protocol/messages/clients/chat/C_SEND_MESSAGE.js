import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer";
import { store } from "../../../../redux/redux-store";
import { sendMessageWS } from "../../../websocet";

export default class C_SEND_MESSAGE {
    constructor(username,chatRoom,chatMessage){
        
        this.MESSAG_ENAME = 'C_SEND_MESSAGE'
        this.clientIdWebsocket = null
        this.showLog = true
        this.username = username
        this.chatRoom = chatRoom
        this.chatMessage = chatMessage

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.exec()
    }

    exec() {
        sendMessageWS({ 
            name: this.MESSAG_ENAME, 
            clientIdWs: this.clientIdWebsocket, 
            username:  this.username,
            chatRoom: this.chatRoom,
            lobbyName: null,
            otherClientIdWs:null,
            otherUsername:null, 
            chatMessage: this.chatMessage
        })
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}, username: ${this.username} chatMessage: ${this.chatMessage}`);
        }
    }

}