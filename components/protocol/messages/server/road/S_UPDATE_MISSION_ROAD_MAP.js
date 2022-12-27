import {store} from "../../../../redux/redux-store";
import {
    calcAvailableToClaimMissionsRoad,
    setCurrentActiveMission,
    setRoadMissions
} from "../../../../redux/reducers/road/RoadReducer";

export default class S_UPDATE_MISSION_ROAD_MAP {
    constructor(username, missions, coins, diamonds){

        this.MESSAG_ENAME = 'S_UPDATE_MISSION_ROAD_MAP'
        this.showLog = true

        this.username = username
        this.missions =  typeof missions === 'string' ? JSON.parse(missions) : missions
        this.coins = coins
        this.diamonds = diamonds

        this.init()
    }

    init() {
        this.exec()
        this.getLogText()
    }

    exec() {
        if(this.missions && this.missions.length > 0){
            store.dispatch(setRoadMissions(this.missions))

            this.checkMissions(this.missions)
        }
    }

    checkMissions = (missions) =>{
        let countMissions = 0
        missions.forEach(mission=>{
            if(mission && mission.isFinished && !mission.isClaimed){
                countMissions += 1
            }
            if(mission && !mission.isClaimed && mission.isAvailable && mission.isAvailableExecute){
                this.setCurrentActiveMission(mission.id)
            }
        })

        this.setAvailableToClaimMissionsRoad(countMissions)
    }

    setAvailableToClaimMissionsRoad = (countMissions) =>{
        store.dispatch(calcAvailableToClaimMissionsRoad(countMissions))
    }

    setCurrentActiveMission = (id) =>{
        store.dispatch(setCurrentActiveMission(id))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} username:${this.username} missions:${this.missions.length}  coins:${this.coins}  diamonds:${this.diamonds}  `);
        }
    }

}