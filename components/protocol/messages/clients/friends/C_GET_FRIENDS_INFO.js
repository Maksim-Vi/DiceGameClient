import {isProduction} from "../../../../utils/utils";
import {sendMessageWS} from "../../../websocet";

export default class C_GET_FRIENDS_INFO {
    constructor(username){

        this.MESSAG_ENAME = 'C_GET_FRIENDS_INFO'
        this.showLog = isProduction() ? false : true

        this.username = username

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        sendMessageWS({
            name: this.MESSAG_ENAME,
            username: this.username,
        })
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}