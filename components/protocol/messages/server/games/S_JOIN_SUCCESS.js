import {isProduction} from "../../../../utils/utils";

export default class S_JOIN_SUCCESS {
    constructor(data){

        this.MESSAG_ENAME = 'S_JOIN_SUCCESS'
        this.showLog = isProduction() ? false : true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} data:`, this.data);
        }
    }

}