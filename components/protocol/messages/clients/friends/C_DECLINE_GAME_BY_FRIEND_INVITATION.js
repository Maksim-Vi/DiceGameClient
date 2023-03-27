import {isProduction} from "../../../../utils/utils";
import {sendMessageWS} from "../../../websocet";

export default class C_DECLINE_GAME_BY_FRIEND_INVITATION {
    constructor(gameId, username, friendUsername){

        this.MESSAG_ENAME = 'C_DECLINE_GAME_BY_FRIEND_INVITATION'
        this.showLog = isProduction() ? false : true

        this.gameId = gameId
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
            gameId: this.gameId,
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