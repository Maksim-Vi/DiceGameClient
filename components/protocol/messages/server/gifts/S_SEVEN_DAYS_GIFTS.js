import {setUsersOnline} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";
import {setGiftsData} from "../../../../redux/reducers/gifts/GiftsReducer";

export default class S_SEVEN_DAYS_GIFTS {
    constructor(sevenDaysGifts){

        this.MESSAG_ENAME = 'S_SEVEN_DAYS_GIFTS'
        this.showLog = true

        this.sevenDaysGifts = JSON.parse(sevenDaysGifts)

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setGiftsData({
            giftType: 'sevenDaysGifts',
            giftData: this.sevenDaysGifts
        }))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} sevenDaysGifts: ${this.sevenDaysGifts.length}`);
        }
    }

}