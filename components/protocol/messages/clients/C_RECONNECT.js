import { selectMyUser } from "../../../redux/reducers/players/PlayersReducer"
import { store } from "../../../redux/redux-store"
import {sendMessageWS} from "../../websocet"
import {isProduction} from "../../../utils/utils";

export default class C_RECONNECT {
    constructor(clientId){

        this.MESSAG_ENAME = 'C_RECONNECT'
        this.showLog = isProduction() ? false : true

        this.clientId = clientId
        this.username = null

        this.init()
    }

    init() {
        this.getUserData()
        this.exec()
        this.getLogText()
    }

    exec() {
        sendMessageWS({ name: this.MESSAG_ENAME, clientIdWs: this.clientId, username: this.username })

    }

    getUserData = () =>{
        const myUser = selectMyUser(store.getState())
        if(myUser){
            this.username = myUser.username
        }
       
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}