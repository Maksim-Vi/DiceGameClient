import {store} from "../../../redux/redux-store";

export default class S_CREATE_ACCOUNT_FAILED {
    constructor(data){

        this.MESSAG_ENAME = 'S_CREATE_ACCOUNT_FAILED'
        this.showLog = true

        this.data = data

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
		    console.log(`${this.MESSAG_ENAME} data:`, this.data);
        }
    }

}