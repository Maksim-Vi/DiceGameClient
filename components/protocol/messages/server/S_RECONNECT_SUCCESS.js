import {isProduction} from "../../../utils/utils";
import GameModel from "../../../games/GameModel/GameModel";

export default class S_RECONNECT_SUCCESS {
    constructor(error){

        this.MESSAG_ENAME = 'S_RECONNECT_SUCCESS'
        this.showLog = isProduction() ? false : true
        this.message = error

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