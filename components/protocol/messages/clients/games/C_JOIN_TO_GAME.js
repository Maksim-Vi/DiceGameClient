import { selectMyUser } from "../../../../redux/reducers/players/PlayersReducer"
import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../../redux/redux-store"
import { sendMessageWS } from "../../../websocet"
import {isProduction} from "../../../../utils/utils";
import {selectDifficultGame} from "../../../../redux/reducers/game/GameReducer";

const difficultGameDeff = {
    Easy: 'Easy', Medium: 'Medium', Hard: 'Hard'
}

export default class C_JOIN_TO_GAME {
    constructor(gameId){

        this.MESSAGE_NAME = 'C_JOIN_TO_GAME'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : true


        this.difficultGame = this.getDifficultGame()
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
        sendMessageWS({
            name: this.MESSAGE_NAME,
            clientIdWs: this.clientIdWebsocket,
            userId: this.id,
            username: this.username,
            gameId: this.gameId,
            difficultGame: this.difficultGame
        })
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())

        this.id = user.id
        this.username = user.username
    }

    getDifficultGame = () =>{
        const DifficultGame = selectDifficultGame(store.getState())

        return DifficultGame ? DifficultGame : difficultGameDeff.Medium
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAGE_NAME}`);
        }
    }

}