export default class S_UPDATE_USER_STATISTICS {
    constructor(statistics) {

        this.MESSAG_ENAME = 'S_UPDATE_USER_STATISTICS'
        this.showLog = true

        this.statistics = statistics

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec(){

    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} statistics: ${this.statistics}`);
        }
    }
}
