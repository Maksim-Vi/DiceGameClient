import {setLeftTimeShowAd} from "../../../../redux/reducers/AD/AdvertisingReducer";
import {store} from "../../../../redux/redux-store";

export default class S_UPDATE_USER_ADMOD_TIME {
    constructor(time){

        this.MESSAG_ENAME = 'S_UPDATE_USER_ADMOD_TIME'
        this.showLog = true

        this.time = time

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setLeftTimeShowAd(this.time))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} time: ${this.time}`);
        }
    }

}