import { setClientIdWebsocket } from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"

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
        store.dispatch(setClientIdWebsocket(this.clientId))
    }

    exec() {

    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} ${this.clientId}`);
        }
    }

}