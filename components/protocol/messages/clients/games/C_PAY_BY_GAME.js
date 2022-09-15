import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../../redux/redux-store"
import { sendMessageWS } from "../../../websocet"
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {selectCurrentGameId} from "../../../../redux/reducers/game/GameReducer";

export default class C_PAY_BY_GAME {
    constructor(gameId){

        this.MESSAG_ENAME = 'C_PAY_BY_GAME'
        this.clientIdWebsocket = null
        this.showLog = true

        this.username = ''
        this.flash = ''
        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.selectUserData()
        this.setClientId()
        this.exec()
    }

    exec() {
        if(this.flash > 0){
            sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, gameId: this.gameId, username: this.username })
        } else {
            alert('Ups, you used all your flash! please by or wait a cuple of time.')
        }
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())

        this.username = user.username
        this.flash = user.flash
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} gameId: ${this.gameId}`);
        }
    }

}