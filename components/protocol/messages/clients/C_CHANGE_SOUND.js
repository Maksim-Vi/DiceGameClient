import {sendMessageWS} from "../../websocet"
import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";

export default class C_CHANGE_SOUND {
    constructor(sound) {

        this.MESSAG_ENAME = 'C_CHANGE_SOUND'
        this.clientIdWebsocket = null
        this.showLog = true

        this.username = null
        this.sound = sound

        this.init()
    }

    init() {
        this.getUserData()
        this.exec()
        this.getLogText()
    }

    exec() {
        sendMessageWS({
            name: this.MESSAG_ENAME,
            username: this.username,
            sound: this.sound
        })
    }

    getUserData = () => {
        const myUser = selectMyUser(store.getState())
        if (myUser) {
            this.username = myUser.username
        }
    }

    getLogText() {
        if (this.showLog) {
            console.log(`${this.MESSAG_ENAME}, name: ${this.username} sound: ${this.sound}`);
        }
    }

}