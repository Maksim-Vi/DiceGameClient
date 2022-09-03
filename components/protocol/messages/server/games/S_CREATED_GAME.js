
import { resetScores, setCarrentGameId, setThrowData } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"

export default class S_CREATED_GAME {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_CREATED_GAME'
        this.showLog = true

        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setCarrentGameId(this.gameId))
        store.dispatch(setThrowData(null))
        store.dispatch(resetScores())
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} gameID: ${this.gameId}`);
        }
    }

}