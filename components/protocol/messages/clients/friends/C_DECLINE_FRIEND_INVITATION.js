import {isProduction} from "../../../../utils/utils";
import {sendMessageWS} from "../../../websocet";

export default class C_DECLINE_FRIEND_INVITATION {
    constructor(username, friendUsername, invitationId){

        this.MESSAG_ENAME = 'C_DECLINE_FRIEND_INVITATION'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.friendUsername = friendUsername
        this.invitationId = invitationId

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
            invitationId: this.invitationId,
        })
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}