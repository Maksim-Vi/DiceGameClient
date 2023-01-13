import {setUsersOnline} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";

export default class S_UPDATE_SEVEN_DAYS_GIFTS {
    constructor(data){

        this.MESSAG_ENAME = 'S_UPDATE_SEVEN_DAYS_GIFTS'
        this.showLog = true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {

    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} data: ${this.data}`);
        }
    }

}