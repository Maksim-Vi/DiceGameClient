
export default class C_CHANGE_LANGUAGE  {
    constructor(){

        this.MESSAG_ENAME = 'C_CHANGE_LANGUAGE'
        this.clientIdWebsocket = null
        this.showLog = false

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
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}