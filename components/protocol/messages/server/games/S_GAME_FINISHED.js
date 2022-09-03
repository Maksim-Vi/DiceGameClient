
import { store } from "../../../../redux/redux-store"

export default class S_GAME_FINISHED {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_GAME_FINISHED'
        this.showLog = true

        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {

    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}