import { setLoaded } from "../../../redux/reducers/Websocket/WebsocketReducer"
import { store } from "../../../redux/redux-store"
import C_PING from "../clients/C_PING"

export default class S_PONG {
    constructor(data){

        this.MESSAG_ENAME = 'S_PONG'
        this.showLog = false

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
        store.dispatch(setLoaded(true))
    }

    exec() {
        window.wsPing = this.data.ts;
        new C_PING()
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}