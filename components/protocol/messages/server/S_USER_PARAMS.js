
export default class S_USER_PARAMS {
    constructor(userParams){

        this.MESSAG_ENAME = 'S_USER_PARAMS'
        this.showLog = false

        this.userParams = userParams

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
            console.log(`${this.MESSAG_ENAME} data:`, this.userParams);
        }
    }

}