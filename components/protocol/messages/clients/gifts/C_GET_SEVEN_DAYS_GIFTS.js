import {isProduction} from "../../../../utils/utils";

export default class C_GET_SEVEN_DAYS_GIFTS {
    constructor(sevenDaysGifts){

        this.MESSAG_ENAME = 'C_GET_SEVEN_DAYS_GIFTS'
        this.showLog = isProduction() ? false : true
        this.sevenDaysGifts = sevenDaysGifts

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