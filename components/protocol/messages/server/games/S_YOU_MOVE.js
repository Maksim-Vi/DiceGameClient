
import { setIsYouMove } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"

export default class S_YOU_MOVE {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_YOU_MOVE'
        this.showLog = true

        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
       store.dispatch(setIsYouMove(true))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}