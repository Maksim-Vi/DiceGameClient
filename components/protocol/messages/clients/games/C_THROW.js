import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../../redux/redux-store"
import { sendMessageWS } from "../../../websocet"
import {isProduction} from "../../../../utils/utils";

export default class C_THROW {
    constructor(userId, username, gameId){

        this.MESSAG_ENAME = 'C_THROW'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : true
        this.userId = userId
        this.username = username
        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, userId: this.userId, username: this.username, gameId: this.gameId })
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    } 

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} username: ${this.username}`);
        }
    }

}