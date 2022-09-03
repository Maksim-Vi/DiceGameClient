import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../../redux/redux-store"
import { sendMessageWS } from "../../../websocet"

export default class C_PAY_BY_GAME {
    constructor(price){

        this.MESSAG_ENAME = 'C_PAY_BY_GAME'
        this.clientIdWebsocket = null
        this.showLog = true

        this.price = price

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, price: this.price })
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