
import { store } from "../../../../redux/redux-store"
import {setRestoreGame, setResultGame} from "../../../../redux/reducers/game/GameReducer";
import {isProduction, transitionState} from "../../../../utils/utils";
import {setInvitedOpponent} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_GAME_RESULT {
    constructor(resultData){

        this.MESSAG_ENAME = 'S_GAME_RESULT'
        this.showLog = isProduction() ? false : true

        this.resultData = resultData

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setInvitedOpponent(null))
        store.dispatch(setRestoreGame(false))
        store.dispatch(setResultGame(this.resultData))
        setTimeout(()=>{
            transitionState('ResultScreen')
        },500)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} resultData: ${JSON.stringify(this.resultData)}`);
        }
    }

}