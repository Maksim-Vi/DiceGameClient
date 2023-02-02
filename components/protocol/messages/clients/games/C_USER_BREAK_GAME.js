import {sendMessageWS} from "../../../websocet";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";

export default class C_USER_BREAK_GAME {
    constructor(){

        this.MESSAG_ENAME = 'C_USER_BREAK_GAME'
        this.showLog = true

        this.username = null

        this.init()
    }

    init() {
        this.getUserData()
        this.exec()
        this.getLogText()
    }

    exec() {
        sendMessageWS({name: this.MESSAG_ENAME, username: this.username})
    }

    getUserData = () => {
        const myUser = selectMyUser(store.getState())
        if (myUser) {
            this.username = myUser.username
        }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}