
import { setCountScores } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"
import {isProduction} from "../../../../utils/utils";
import GameModel from "../../../../games/GameModel/GameModel";

export default class S_COUNT_SCORES {
    constructor(scoresUser,scoresOpponent){

        this.MESSAG_ENAME = 'S_COUNT_SCORES'
        this.showLog = isProduction() ? false : true

        this.scoresUser = scoresUser
        this.scoresOpponent = scoresOpponent

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setCountScores({
            scoresUser: this.scoresUser,
            scoresOpponent: this.scoresOpponent
        }))

        GameModel.setUsersMaxScores(this.scoresUser,this.scoresOpponent)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} scoresUser: ${JSON.stringify(this.scoresUser)} scoresOpponent: ${JSON.stringify(this.scoresOpponent)}`);
        }
    }

}