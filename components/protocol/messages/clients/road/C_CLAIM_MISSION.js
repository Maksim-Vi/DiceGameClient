import {store} from "../../../../redux/redux-store";
import {sendMessageWS} from "../../../websocet";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {isProduction} from "../../../../utils/utils";

export default class C_CLAIM_MISSION {
    constructor(missionNumber){

        this.MESSAG_ENAME = 'C_CLAIM_MISSION'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : true
        this.username = null
        this.missionNumber = missionNumber

        this.init()
    }

    init() {
        this.selectUserData()
        this.exec()
        this.getLogText()
    }

    exec() {
        sendMessageWS({
            name: this.MESSAG_ENAME,
            username: this.username,
            missionNumber: this.missionNumber,
        })
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())
        this.username = user.username
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} missionNumber:${this.missionNumber}`);
        }
    }

}