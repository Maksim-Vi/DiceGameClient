import {isProduction} from "../../../../utils/utils";
import {sendMessageWS} from "../../../websocet";

export default class C_DELETE_FROM_FRIENDS {
    constructor(username, friendUsername){

        this.MESSAG_ENAME = 'C_DELETE_FROM_FRIENDS'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.friendUsername = friendUsername

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
            friendUsername: this.friendUsername,
        })
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}