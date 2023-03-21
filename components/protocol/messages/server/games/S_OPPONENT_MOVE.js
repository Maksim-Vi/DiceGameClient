
import { setIsYouMove } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"
import {isProduction} from "../../../../utils/utils";
import GameModel from "../../../../games/GameModel/GameModel";

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

        GameModel.setIsYouMove(false)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}