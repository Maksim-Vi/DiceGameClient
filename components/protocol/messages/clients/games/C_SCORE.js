import {
    selectOpponentThrowData,
    setIsYouMove,
    setOpponentThrowData,
    setThrowData
} from "../../../../redux/reducers/game/GameReducer"
import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../../redux/redux-store"
import { sendMessageWS } from "../../../websocet"

export default class C_SCORE {
    constructor(userId, username, gameId, index, score){

        this.MESSAG_ENAME = 'C_SCORE'
        this.clientIdWebsocket = null
        this.showLog = true

        this.userId = userId
        this.username = username
        this.gameId = gameId
        this.index = index
        this.score = score

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.exec()
    }

    exec() {
        store.dispatch(setThrowData(null))
        store.dispatch(setOpponentThrowData(null))
        store.dispatch(setIsYouMove(false))

        sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, userId: this.userId, username: this.username, gameId: this.gameId, index: this.index, score: this.score})
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