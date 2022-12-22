
export default class S_UPDATE_MISSION_ROAD_MAP {
    constructor(username, missions, coins, diamonds){

        this.MESSAG_ENAME = 'S_UPDATE_MISSION_ROAD_MAP'
        this.showLog = true

        this.username = username
        this.missions = missions
        this.coins = coins
        this.diamonds = diamonds

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
		    console.log(`${this.MESSAG_ENAME} username:${this.username} missions:${this.missions}  coins:${this.coins}  diamonds:${this.diamonds}  `);
        }
    }

}