import {updateCurrentUserFlash} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";
import {setInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {isProduction} from "../../../../utils/utils";

const status = {
    success: 1,
    dontHaveFlesh: 2,
    cannotPay: 3,
}

export default class S_UPDATE_USER_FLASH {
    constructor(status, flash){

        this.MESSAG_ENAME = 'S_UPDATE_USER_FLASH'
        this.showLog = isProduction() ? false : true

        this.status = status
        this.flash = flash

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        if(this.status === status.success){
            store.dispatch(updateCurrentUserFlash(this.flash))
        } else if(this.status === status.dontHaveFlesh){
            store.dispatch(setInfoPopup({visible: true, data: {text: 'Ops, you dont have flesh'}}))
        } else if(this.status === status.cannotPay){
            store.dispatch(setInfoPopup({visible: true, data: {text: 'Ops, server cannot get pay for game'}}))

        }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} flash: ${this.flash}`);
        }
    }

}