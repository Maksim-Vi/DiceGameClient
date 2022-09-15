import { selectMyUser } from "../../../redux/reducers/players/PlayersReducer"
import { selectClientIdWebsocket } from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"
import {sendMessageWS, websocket} from "../../websocet"

export default class C_LEAVE_SOCKET {
    constructor(){

        this.MESSAG_ENAME = 'C_LEAVE_SOCKET'
        this.clientIdWebsocket = null
        this.showLog = true

        this.id = null
        this.username = null

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.getUserData()
        this.exec()
    }

    exec() {
       sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, id: this.id, username: this.username })

        if (websocket) {
            websocket.close();
        }
    }

    getUserData = () =>{
        const myUser = selectMyUser(store.getState())
        if(myUser){
            this.id = myUser.id
            this.username = myUser.username
        }
       
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