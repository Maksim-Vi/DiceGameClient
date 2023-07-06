import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";
import {sendMessageWS} from "../../../websocet";
import {isProduction} from "../../../../utils/utils";

export default class C_CLAIM_EVERY_DAY_GIFT {
    constructor(){

        this.MESSAG_ENAME = 'C_CLAIM_EVERY_DAY_GIFT'
        this.showLog = isProduction() ? false : true
       
        this.username = null
    
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