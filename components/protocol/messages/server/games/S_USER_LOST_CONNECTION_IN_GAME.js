import {setLostConnOppPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {store} from "../../../../redux/redux-store";

export default class S_USER_LOST_CONNECTION_IN_GAME {
    constructor(leaveUsername, opponentUsername){

        this.MESSAG_ENAME = 'S_USER_LOST_CONNECTION_IN_GAME'
        this.showLog = true

        this.leaveUsername = leaveUsername
        this.opponentUsername = opponentUsername
        this.waitTime = 30

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setLostConnOppPopup({
            visible: true,
            data: {
                leaveUsername: this.leaveUsername,
                opponentUsername: this.opponentUsername,
                waitTime: this.waitTime
            }
        }))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} ${this.leaveUsername}`);
        }
    }

}