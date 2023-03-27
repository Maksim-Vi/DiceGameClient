
import {isProduction} from "../../../../utils/utils";
import {store} from "../../../../redux/redux-store";
import {setInvitedOpponent} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_GAME_FINISHED {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_GAME_FINISHED'
        this.showLog = isProduction() ? false : true

        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setInvitedOpponent(null))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}