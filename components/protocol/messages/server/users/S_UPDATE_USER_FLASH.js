import {updateCurrentUserFlash} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";

const status = {
    success: 1,
    dontHaveFlesh: 2,
    cannotPay: 3,
}

export default class S_UPDATE_USER_FLASH {
    constructor(status, flash){

        this.MESSAG_ENAME = 'S_UPDATE_USER_FLASH'
        this.showLog = true

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
            if(this.flash){
                store.dispatch(updateCurrentUserFlash(this.flash))
            }
        } else if(this.status === status.dontHaveFlesh){
            alert('Ops, you dont have flesh')
        } else if(this.status === status.cannotPay){
            alert('Ops, server cannot get pay for game')
        }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} flash: ${this.flash}`);
        }
    }

}