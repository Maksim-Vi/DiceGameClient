import {selectMyUser, setUsersOnline} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";
import {sendMessageWS} from "../../../websocet";

export default class C_CLAIM_SEVEN_DAYS_GIFTS {
    constructor(sevenDaysGiftsNumber){

        this.MESSAG_ENAME = 'C_CLAIM_SEVEN_DAYS_GIFTS'
        this.showLog = true

        this.username = null
        this.sevenDaysGiftsNumber = sevenDaysGiftsNumber

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
            sevenDaysGiftsNumber: this.sevenDaysGiftsNumber,
        })
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())
        this.username = user.username
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}