import {isProduction, transitionState} from "../../../../utils/utils";
import {store} from "../../../../redux/redux-store";
import {setRestoreGame} from "../../../../redux/reducers/game/GameReducer";
import {setInvitedOpponent} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_GAME_BROKEN {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_GAME_BROKEN'
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
        store.dispatch(setRestoreGame(false))
        transitionState('MainScreen')
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}