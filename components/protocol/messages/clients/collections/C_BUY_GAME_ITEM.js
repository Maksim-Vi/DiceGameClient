import {selectClientIdWebsocket} from "../../../../redux/reducers/Websocket/WebsocketReducer";
import {store} from "../../../../redux/redux-store";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {sendMessageWS} from "../../../websocet";
import {isProduction} from "../../../../utils/utils";

export default class C_BUY_GAME_ITEM {
    constructor(type,price,itemId){

        this.MESSAG_ENAME = 'C_BUY_GAME_ITEM'
        this.clientIdWebsocket = null
        this.showLog = isProduction() ? false : true
        this.username = ''
        this.type = type
        this.price = price
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
            username: this.username,
            price: this.price,
            itemId: this.itemId,
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
            console.log(`${this.MESSAG_ENAME} type: ${this.type} price: ${this.price}`);
        }
    }

}