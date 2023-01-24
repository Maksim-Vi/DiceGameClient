import {selectClientIdWebsocket, setClientIdWebsocket} from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"
import C_RECONNECT from "../clients/C_RECONNECT";

export default class S_CLIENT_LOADED {
    constructor(clientId){

        this.MESSAG_ENAME = 'S_CLIENT_LOADED'
        this.showLog = true

        this.clientId = clientId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        const WSClientId = selectClientIdWebsocket(store.getState())
        if(WSClientId && WSClientId !== this.clientId){
            new C_RECONNECT()
        }
        store.dispatch(setClientIdWebsocket(this.clientId))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} ${this.clientId}`);
        }
    }

}