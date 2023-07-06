import {isProduction} from "../../../../utils/utils";

export default class C_GET_EVERY_DAY_GIFT {
    constructor(sevenDaysGifts){

        this.MESSAG_ENAME = 'C_GET_EVERY_DAY_GIFT'
        this.showLog = isProduction() ? false : true

        this.username = null
       

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