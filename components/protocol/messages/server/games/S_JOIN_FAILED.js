import {isProduction, transitionState} from "../../../../utils/utils";
import {store} from "../../../../redux/redux-store";
import {setNotEnoughFlashPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {selectUserFlash} from "../../../../redux/reducers/players/PlayersReducer";
import GameModel from "../../../../games/GameModel/GameModel";

export default class S_JOIN_FAILED {
    constructor(data){

        this.MESSAG_ENAME = 'S_JOIN_FAILED'
        this.showLog = isProduction() ? false : true

        this.username = data.username
        this.message = data.message

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        GameModel.destroyGame()
        const userFlash = selectUserFlash(store.getState())
        if(userFlash < 1){
            return store.dispatch(setNotEnoughFlashPopup({visible: true}))
            transitionState('App')
        }
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} username:`, this.username);
        }
    }

}