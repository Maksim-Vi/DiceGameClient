
import { store } from "../../../../redux/redux-store"
import {setRestoreGame} from "../../../../redux/reducers/game/GameReducer";
import {isProduction, transitionState} from "../../../../utils/utils";
import {selectActiveTabApp} from "../../../../redux/reducers/Websocket/WebsocketReducer";

export default class S_LEAVE_GAME {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_LEAVE_GAME'
        this.showLog = isProduction() ? false : true

        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setRestoreGame(false))

        const activeTab = selectActiveTabApp(store.getState())
        if(activeTab === 'LoadingInvitationGameScreen'){
            transitionState('App')
        }
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}