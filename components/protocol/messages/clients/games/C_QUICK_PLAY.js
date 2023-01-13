import { selectMyUser } from "../../../../redux/reducers/players/PlayersReducer"
import { selectClientIdWebsocket } from "../../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../../redux/redux-store"
import { sendMessageWS } from "../../../websocet"
import {transitionState} from "../../../../utils/utils";

// 1: 'play_robot',
// 2: 'play_opponent',
// 3: 'play_opponents',

export default class C_QUICK_PLAY {
    constructor(gameType){

        this.MESSAG_ENAME = 'C_QUICK_PLAY'
        this.clientIdWebsocket = null
        this.showLog = true

        this.id = ''
        this.username = ''
        this.gameType = gameType

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.selectUserData()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientIdWebsocket, userId: this.id,  username: this.username, gameType: this.gameType})
        this.loadLoadingScreen()
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())

        this.id = user.id
        this.username = user.username
    }

    loadLoadingScreen = () =>{
        //window.navigation.navigate('LoadingGameScreen')
        transitionState('LoadingGameScreen')
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