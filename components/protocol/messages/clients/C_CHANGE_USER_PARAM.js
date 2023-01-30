import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";
import {sendMessageWS} from "../../websocet";

export default class C_CHANGE_USER_PARAM  {
    constructor(userParam){

        this.MESSAGE_NAME = 'C_CHANGE_USER_PARAM'
        this.showLog = true

        this.username = null
        this.userParam = userParam

        this.init()
    }

    init() {
        this.selectUserData()
        this.getLogText()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAGE_NAME, username: this.username, userParam: this.userParam })
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())

        this.username = user.username
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAGE_NAME} userParam: ${this.userParam}`);
        }
    }

}