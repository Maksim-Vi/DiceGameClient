
import { store } from "../../../../redux/redux-store"
import {setRestoreGame} from "../../../../redux/reducers/game/GameReducer";

export default class S_LEAVE_GAME {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_LEAVE_GAME'
        this.showLog = true

        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setRestoreGame(false))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}