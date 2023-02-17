import {store} from "../../../../redux/redux-store";
import {setStatistics} from "../../../../redux/reducers/players/PlayersReducer";
import {isProduction} from "../../../../utils/utils";

export default class S_UPDATE_USER_STATISTICS {
    constructor(statistics) {

        this.MESSAG_ENAME = 'S_UPDATE_USER_STATISTICS'
        this.showLog = isProduction() ? false : true

        this.statistics = typeof statistics === 'string' ? JSON.parse(statistics) : statistics

        this.bot = null
        this.opponent = null

        this.statistics && this.statistics.forEach(item=>{
            if(item['bot']){
                this.bot = item['bot']
            } else if(item['opponent']){
                this.opponent = item['opponent']
            }

        })

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec(){
        let newObj = {}
        newObj = {...newObj, bot: this.bot, opponent: this.opponent}

        store.dispatch(setStatistics(newObj))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} bot: ${JSON.stringify(this.bot)} opponent: ${JSON.stringify(this.opponent)}`);
        }
    }
}
