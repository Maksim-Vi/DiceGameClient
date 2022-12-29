import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";
import {sendMessageWS} from "../../websocet";

export default class C_CHANGE_LANGUAGE  {
    constructor(language){

        this.MESSAGE_NAME = 'C_CHANGE_LANGUAGE'
        this.clientIdWebsocket = null
        this.showLog = true

        this.username = null
        this.language = language

        this.init()
    }

    init() {
        this.selectUserData()
        this.getLogText()
        this.exec()
    }

    exec() {
        sendMessageWS({ name: this.MESSAGE_NAME, username: this.username, language: this.language })
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