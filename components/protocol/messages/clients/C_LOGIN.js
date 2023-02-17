import {sendMessageWS} from "../../websocet"
import {isProduction} from "../../../utils/utils";

export default class C_LOGIN {
    constructor(clientIdWebsocket, username, password) {

        this.MESSAG_ENAME = 'C_LOGIN'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : true

        this.clientIdWebsocket = clientIdWebsocket
        this.username = username
        this.password = password

        this.init()
    }

    init() {
        this.exec()
        this.getLogText()
    }

    exec() {
        setTimeout(() => {
            sendMessageWS({
                name: this.MESSAG_ENAME,
                clientIdWs: this.clientIdWebsocket,
                username: this.username,
                password: this.password
            })
        }, 2000)
    }

    getLogText() {
        if (this.showLog) {
            console.log(`${this.MESSAG_ENAME}, name: ${this.username}`);
        }
    }

}