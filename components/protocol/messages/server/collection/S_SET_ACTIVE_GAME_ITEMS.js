import {store} from "../../../../redux/redux-store";
import {setActiveItems} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_SET_ACTIVE_GAME_ITEMS {
    constructor(activeItems){

        this.MESSAG_ENAME = 'S_SET_ACTIVE_GAME_ITEMS'
        this.showLog = false

        this.activeItems = activeItems

        this.init()
    }

    init() {
        this.exec()
        this.getLogText()
    }

    exec() {
        store.dispatch(setActiveItems(this.activeItems || {dice: 14, square: 13}))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} activeItems: ${this.activeItems}`);
        }
    }

}