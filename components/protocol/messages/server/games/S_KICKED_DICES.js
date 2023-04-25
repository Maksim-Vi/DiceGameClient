import {isProduction} from "../../../../utils/utils";
import Dispatcher from "../../../../games/Events/Dispatcher";

export default class S_KICKED_DICES {
    constructor(username, kickFrom, kickTo, countKickDice, indexList){

        this.MESSAG_ENAME = 'S_KICKED_DICES'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.kickFrom = kickFrom
        this.kickTo = kickTo
        this.countKickDice = countKickDice
        this.indexList = indexList

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        Dispatcher.dispatch('message:kickDices', {
            kickFrom: this.kickFrom,
            kickTo: this.kickTo,
            countKickDice: this.countKickDice,
            indexList: this.indexList
        });
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} kickFrom ${this.kickFrom} kickTo ${this.kickTo} countKickDice ${this.countKickDice} indexList ${this.indexList}`);
        }
    }

}