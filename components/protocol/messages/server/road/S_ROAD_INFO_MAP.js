
export default class S_ROAD_INFO_MAP {
    constructor(username,missions){

        this.MESSAG_ENAME = 'S_ROAD_INFO_MAP'
        this.showLog = true

        this.username = username
        this.missions = missions

        this.init()
    }

    init() {
        this.exec()
        this.getLogText()
    }

    exec() {

    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} username:${this.username} missions:${this.missions}`);
        }
    }

}