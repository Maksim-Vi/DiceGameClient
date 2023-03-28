import {isProduction, transitionState} from "../../../../utils/utils";
import {sendMessageWS} from "../../../websocet";
import {selectClientIdWebsocket} from "../../../../redux/reducers/Websocket/WebsocketReducer";
import {store} from "../../../../redux/redux-store";

export default class C_SEND_GAME_INVITATION_TO_FRIEND {
    constructor(username, friendUsername){

        this.MESSAG_ENAME = 'C_SEND_GAME_INVITATION_TO_FRIEND'
        this.showLog = isProduction() ? false : true

        this.clientIdWebsocket = null
        this.username = username
        this.friendUsername = friendUsername

        this.init()
    }

    init() {
        this.setClientId()
        this.getLogText()
        this.exec()
    }

    exec() {
        transitionState('LoadingInvitationGameScreen', {isOwner: true})
        sendMessageWS({
            name: this.MESSAG_ENAME,
            clientIdWs: this.clientIdWebsocket,
            username: this.username,
            friendUsername: this.friendUsername,
        })
    }

    setClientId(){
        this.clientIdWebsocket = selectClientIdWebsocket(store.getState())
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}