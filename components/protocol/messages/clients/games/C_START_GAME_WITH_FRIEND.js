import {sendMessageWS} from "../../../websocet";
import {isProduction} from "../../../../utils/utils";

export default class C_START_GAME_WITH_FRIEND {
    constructor(gameId, username, friendUsername){

        this.MESSAG_ENAME = 'C_START_GAME_WITH_FRIEND'
        this.showLog = isProduction() ? false : true

        this.gameId = gameId
        this.username = username
        this.friendUsername = friendUsername

        this.init()
    }

    init() {
        this.exec()
        this.getLogText()
    }

    exec() {
        sendMessageWS({
            name: this.MESSAG_ENAME,
            gameId: this.gameId,
            username: this.username,
            friendUsername: this.friendUsername
        })
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} gameId: ${this.gameId}  username: ${this.username} friendUsername: ${this.friendUsername}`);
        }
    }

}