import { selectMyUser } from "../../../../redux/reducers/players/PlayersReducer"
import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../../redux/redux-store"
import { sendMessageWS } from "../../../websocet"
import {isProduction} from "../../../../utils/utils";

export default class C_ABORDED_GAME {
    constructor(gameId){

        this.MESSAG_ENAME = 'C_ABORDED_GAME'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : true
        this.id = ''
        this.username = ''
        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.selectUserData()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, userId: this.id,  username: this.username, gameId: this.gameId })
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())

        this.id = user.id
        this.username = user.username
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} gameId: ${this.gameId}`);
        }
    }

}