import {isProduction, transitionState} from "../../../../utils/utils";
import {sendMessageWS} from "../../../websocet";
import {store} from "../../../../redux/redux-store";
import {setCarrentGameId} from "../../../../redux/reducers/game/GameReducer";

export default class C_ACCEPT_GAME_BY_FRIEND_INVITATION {
    constructor(gameId, username, friendUsername) {

        this.MESSAG_ENAME = 'C_ACCEPT_GAME_BY_FRIEND_INVITATION'
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
        transitionState('LoadingInvitationGameScreen', {isOwner: false})
        store.dispatch(setCarrentGameId(this.gameId))
        sendMessageWS({
            name: this.MESSAG_ENAME,
            gameId: this.gameId,
            username: this.username,
            friendUsername: this.friendUsername,
        })
    }

    getLogText() {
        if (this.showLog) {
            console.log(`${this.MESSAG_ENAME} friendUsername: ${this.friendUsername} success: ${this.success}`);
        }
    }

}