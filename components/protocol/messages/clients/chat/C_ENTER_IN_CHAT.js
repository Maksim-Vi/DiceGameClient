import { selectMyUser } from "../../../../redux/reducers/players/PlayersReducer"
import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../../redux/redux-store"
import { sendMessageWS } from "../../../websocet"
import {isProduction} from "../../../../utils/utils";

export default class C_ENTER_IN_CHAT {
    constructor(chatRoom){
        
        this.MESSAG_ENAME = 'C_ENTER_IN_CHAT'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : true
        this.username = ''
        this.chatRoom = chatRoom
        this.init()
    }

    init() {
        this.getLogText()
        this.selectUserData()
        this.setClientId()
        this.exec()
    }

    exec() {
        sendMessageWS({ 
            name: this.MESSAG_ENAME, 
            clientIdWs: this.clientIdWebsocket, 
            username:  this.username,
            chatRoom:  this.chatRoom,
        })
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())
        this.username = user.username
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}