
import {
    resetScores,
    setCarrentGameId, setCountScores,
    setOpponentThrowData,
    setThrowData
} from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"
import C_PAY_BY_GAME from "../../clients/games/C_PAY_BY_GAME";
import {isProduction} from "../../../../utils/utils";

export default class S_CREATED_GAME {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_CREATED_GAME'
        this.showLog = isProduction() ? false : true

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
        store.dispatch(setOpponentThrowData(null))
        store.dispatch(resetScores())
        store.dispatch(setCountScores(null))

        new C_PAY_BY_GAME(this.gameId)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} gameID: ${this.gameId}`);
        }
    }

}