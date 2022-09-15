import {store} from "../../../../redux/redux-store";
import {updateCurrentUserExp} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_UPDATE_USER_EXP {
    constructor(lvl, levelExp){

        this.MESSAG_ENAME = 'S_UPDATE_USER_EXP'
        this.showLog = true

        this.lvl = lvl
        this.levelExp = levelExp

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(updateCurrentUserExp({
            lvl: this.lvl,
            levelExp: this.levelExp
        }))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} lvl: ${this.lvl} levelExp:${this.levelExp}`);
        }
    }

}