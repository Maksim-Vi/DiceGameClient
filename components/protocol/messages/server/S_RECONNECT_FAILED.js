import {store} from "../../../redux/redux-store";

export default class S_RECONNECT_FAILED {
    constructor(error){

        this.MESSAG_ENAME = 'S_RECONNECT_FAILED'
        this.showLog = true

        this.message = error.message

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.logout()
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} ${this.message}`);
        }
    }

}