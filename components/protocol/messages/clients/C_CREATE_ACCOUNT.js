import { selectClientIdWebsocket } from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"

export default class C_CREATE_ACCOUNT  {
    constructor(){

        this.MESSAG_ENAME = 'C_CREATE_ACCOUNT'
        this.clientIdWebsocket = null
        this.showLog = false

        this.init()
    }

    init() {
        this.getLogText()
        this.setClientId()
        this.exec()
    }

    exec() {
        
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