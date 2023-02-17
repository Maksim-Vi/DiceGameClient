
import { setIsYouMove } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"
import {isProduction} from "../../../../utils/utils";

export default class S_OPPONENT_MOVE {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_OPPONENT_MOVE'
        this.showLog = isProduction() ? false : true
        
        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setIsYouMove(false))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}