import {selectClientIdWebsocket, setClientIdWebsocket} from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"
import C_RECONNECT from "../clients/C_RECONNECT";
import C_LOGIN from "../clients/C_LOGIN";
import {selectLoginUser} from "../../../redux/reducers/login/LoginReducer";

export default class S_CLIENT_LOADED {
    constructor(clientId){

        this.MESSAG_ENAME = 'S_CLIENT_LOADED'
        this.showLog = true

        this.clientId = clientId

        this.username = null
        this.password = null

        this.init()
    }

    init() {
        this.getLogText()
        this.getUserData()
        this.exec()
    }

    exec() {
        const WSClientId = selectClientIdWebsocket(store.getState())
        if(WSClientId && WSClientId !== this.clientId){
            new C_RECONNECT(this.clientId)
        } else if ((!WSClientId || WSClientId === null || WSClientId === undefined) && this.username && this.password){
            new C_LOGIN(this.clientId, this.username, this.password)
        }

        store.dispatch(setClientIdWebsocket(this.clientId))
    }

    getUserData = () => {
        const myUser = selectLoginUser(store.getState())

        if (myUser) {
            this.username = myUser.username
            this.password = myUser.password
        }
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} ${this.clientId}`);
        }
    }

}