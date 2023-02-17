import { sendMessageWS } from "../../../websocet"
import {selectClientIdWebsocket} from "../../../../redux/reducers/Websocket/WebsocketReducer";
import {store} from "../../../../redux/redux-store";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {isProduction} from "../../../../utils/utils";

export default class C_SET_ACTIVE_GAME_ITEM {
    constructor(type,itemId){

        this.MESSAG_ENAME = 'C_SET_ACTIVE_GAME_ITEM'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : false

        this.username = ''
        this.type = type
        this.itemId = itemId

        this.init()
    }

    init() {
        this.selectUserData()
        this.setClientId()
        this.exec()
        this.getLogText()
    }

    exec() {
        sendMessageWS({
            name: this.MESSAG_ENAME,
            clientIdWs: this.clientIdWebsocket,
            type: this.type,
            itemId: this.itemId,
            username: this.username,
        })
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())
        this.username = user.username
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} coins: ${this.coins}, crystals: ${this.crystals}, money: ${this.money}`);
        }
    }

}