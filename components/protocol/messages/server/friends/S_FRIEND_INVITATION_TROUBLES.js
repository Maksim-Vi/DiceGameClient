import {isProduction} from "../../../../utils/utils";

export default class S_FRIEND_INVITATION_TROUBLES {
    constructor(username,friendUsername,message){

        this.MESSAG_ENAME = 'S_FRIEND_INVITATION_TROUBLES'
        this.showLog = isProduction() ? false : true


        this.username = username
        this.friendUsername = friendUsername
        this.message = message

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
            console.log(`${this.MESSAG_ENAME}`, this.friendUsername, this.message);
        }
    }
}