import {selectClientIdWebsocket} from "../../../../redux/reducers/Websocket/WebsocketReducer";
import {store} from "../../../../redux/redux-store";
import {sendMessageWS} from "../../../websocet";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";

export default class C_GET_MISSION_ROAD_MAP {
    constructor(){

        this.MESSAG_ENAME = 'C_GET_MISSION_ROAD_MAP'
        this.clientIdWebsocket = null
        this.showLog = true

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