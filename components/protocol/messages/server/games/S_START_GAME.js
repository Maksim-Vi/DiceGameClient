import { setIsGameStarted } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"
import {isProduction, transitionState} from "../../../../utils/utils";
import GameModel from "../../../../games/GameModel/GameModel";
import Dispatcher from "../../../../games/Events/Dispatcher";

export default class S_START_GAME {
    constructor(data){

        this.MESSAG_ENAME = 'S_START_GAME'
        this.showLog = isProduction() ? false : true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setIsGameStarted(true))
        GameModel.setGameStarted(true, true, 2000)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}