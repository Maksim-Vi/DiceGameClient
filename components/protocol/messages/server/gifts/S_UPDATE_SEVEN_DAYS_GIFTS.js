import {store} from "../../../../redux/redux-store";
import {setAvailableToClaimGift, setGiftsData} from "../../../../redux/reducers/gifts/GiftsReducer";
import {isProduction} from "../../../../utils/utils";

export default class S_UPDATE_SEVEN_DAYS_GIFTS {
    constructor(sevenDaysGifts){

        this.MESSAG_ENAME = 'S_UPDATE_SEVEN_DAYS_GIFTS'
        this.showLog = isProduction() ? false : true

        this.sevenDaysGifts = JSON.parse(sevenDaysGifts)

        this.init()
    }

    init() {
        this.getLogText()
        this.calcAvailableToClaimGift()
        this.exec()
    }

    exec() {
        store.dispatch(setGiftsData({
            giftType: 'sevenDaysGifts',
            giftData: this.sevenDaysGifts
        }))
    }

    calcAvailableToClaimGift = () =>{
        let count = 0
        this.sevenDaysGifts.forEach(item=>{
            if(item.isAvailableClaim && !item.isClaimed){
                count += 1
            }
        })

        store.dispatch(setAvailableToClaimGift(count))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} data: ${this.sevenDaysGifts.length}`);
        }
    }

}