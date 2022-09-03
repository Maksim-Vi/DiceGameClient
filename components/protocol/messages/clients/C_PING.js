import { selectClientIdWebsocket } from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"
import { sendMessageWS } from "../../websocet"

export default class C_PING {
    constructor(){
        
        this.MESSAG_ENAME = 'C_PING'
        this.clientIdWebsocket = null
        this.showLog = false

        this.showLog = false

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, cid: 1234 })
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}