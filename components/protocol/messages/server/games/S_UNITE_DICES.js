import {isProduction} from "../../../../utils/utils";
import Dispatcher from "../../../../games/Events/Dispatcher";

export default class S_UNITE_DICES {
    constructor(username, countUniteDice, indexUniteList){

        this.MESSAG_ENAME = 'S_UNITE_DICES'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.countUniteDice = countUniteDice
        this.indexUniteList = indexUniteList

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        Dispatcher.dispatch('message:collectDices', {
            username: this.username,
            countUniteDice: this.countUniteDice,
            indexUniteList: this.indexUniteList,
        });
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} countUniteDice ${this.countUniteDice} indexUniteList ${this.indexUniteList}`);
        }
    }

}