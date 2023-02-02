import {transitionState} from "../../../../utils/utils";
import {store} from "../../../../redux/redux-store";
import {setRestoreGame} from "../../../../redux/reducers/game/GameReducer";

export default class S_GAME_BROKEN {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_GAME_BROKEN'
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
        transitionState('MainScreen')
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}