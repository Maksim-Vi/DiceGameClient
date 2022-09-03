
export default class S_CREATE_ACCOUNT_SUCCESS {
    constructor(data){

        this.MESSAG_ENAME = 'S_CREATE_ACCOUNT_SUCCESS'
        this.showLog = true

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