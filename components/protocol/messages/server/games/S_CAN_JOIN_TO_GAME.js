import C_JOIN_TO_GAME from "../../clients/games/C_JOIN_TO_GAME";
import {isProduction} from "../../../../utils/utils";

export default class S_CAN_JOIN_TO_GAME {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_CAN_JOIN_TO_GAME'
        this.showLog = isProduction() ? false : true

        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        new C_JOIN_TO_GAME(this.gameId)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}