import { selectClientIdWebsocket } from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"
import { sendMessageWS } from "../../websocet"
import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";
import {isProduction} from "../../../utils/utils";

export default class C_PING {
    constructor(){
        
        this.MESSAG_ENAME = 'C_PING'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : false
        this.username = ''

        this.init()
    }

    init() {
        this.getLogText()
        this.selectUserData()
        this.setClientId()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, username:  this.username })
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