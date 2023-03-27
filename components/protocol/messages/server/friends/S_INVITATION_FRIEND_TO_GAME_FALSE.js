import {isProduction} from "../../../../utils/utils";
import {store} from "../../../../redux/redux-store";
import {setInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";

export default class S_INVITATION_FRIEND_TO_GAME_FALSE {
    constructor(username, friendUsername, success, message, reason) {

        this.MESSAG_ENAME = 'S_INVITATION_FRIEND_TO_GAME_FALSE'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.friendUsername = friendUsername
        this.success = success
        this.message = message
        this.reason = reason

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setInfoPopup({visible: true, data: {text: this.message}}))
    }

    getLogText() {
        if (this.showLog) {
            console.log(`${this.MESSAG_ENAME} username: ${this.username} diceScore: ${this.diceScore}`);
        }
    }

}