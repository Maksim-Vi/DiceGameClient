import { selectClientIdWebsocket } from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"
import { sendMessageWS } from "../../websocet"

export default class C_LOGIN {
    constructor(username, password){

        this.MESSAG_ENAME = 'C_LOGIN'
        this.clientIdWebsocket = null
        this.showLog = true

        this.username = username
        this.password = password

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.exec()
    }

    exec() {
        setTimeout(()=>{
            sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, username: this.username, password: this.password  })
        },2000)
    }
    
    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}, name: ${this.username}`);
        }
    }

}