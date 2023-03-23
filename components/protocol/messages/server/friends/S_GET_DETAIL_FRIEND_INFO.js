import {isProduction} from "../../../../utils/utils";

export default class S_GET_DETAIL_FRIEND_INFO {
    constructor(username,userFriend){

        this.MESSAG_ENAME = 'S_GET_DETAIL_FRIEND_INFO'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.userFriend = userFriend

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
            console.log(`${this.MESSAG_ENAME}`, this.userFriend);
        }
    }
}