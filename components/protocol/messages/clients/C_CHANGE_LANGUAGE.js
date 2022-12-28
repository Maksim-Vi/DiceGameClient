import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";
import {sendMessageWS} from "../../websocet";

export default class C_CHANGE_LANGUAGE  {
    constructor(lenguage){

        this.MESSAGE_NAME = 'C_CHANGE_LANGUAGE'
        this.clientIdWebsocket = null
        this.showLog = true

        this.username = null
        this.lenguage = lenguage

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAGE_NAME, username: this.username, language: this.lenguage })
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())

        this.username = user.username
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAGE_NAME} lenguage: ${this.lenguage}`);
        }
    }

}