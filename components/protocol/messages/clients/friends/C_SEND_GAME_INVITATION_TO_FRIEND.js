import {isProduction, transitionState} from "../../../../utils/utils";
import {sendMessageWS} from "../../../websocet";

export default class C_SEND_GAME_INVITATION_TO_FRIEND {
    constructor(username, friendUsername){

        this.MESSAG_ENAME = 'C_SEND_GAME_INVITATION_TO_FRIEND'
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
        transitionState('LoadingInvitationGameScreen', {isOwner: true})
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