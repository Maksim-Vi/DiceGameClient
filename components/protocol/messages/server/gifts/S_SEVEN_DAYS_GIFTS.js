import {store} from "../../../../redux/redux-store";
import {
    selectIsFinishedSevenDays,
    setAvailableToClaimGift,
    setGiftsData
} from "../../../../redux/reducers/gifts/GiftsReducer";
import {isProduction} from "../../../../utils/utils";
import {useSelector} from "react-redux";
import {selectDefaultParams} from "../../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../../redux/reducers/language/defaultParams";
import {setSevenDaysGiftPopup} from "../../../../redux/reducers/popups/PopupsReducer";

export default class S_SEVEN_DAYS_GIFTS {
    constructor(sevenDaysGifts){

        this.MESSAG_ENAME = 'S_SEVEN_DAYS_GIFTS'
        this.showLog = isProduction() ? false : true

        this.sevenDaysGifts =  typeof sevenDaysGifts === 'string' ? JSON.parse(sevenDaysGifts) : sevenDaysGifts

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        const ENABLE_SEVEN_DAYS_GIFT = selectDefaultParams(store.getState(), defaultParams.ENABLE_SEVEN_DAYS_GIFT)
        const isFinished = selectIsFinishedSevenDays(store.getState())
        const isSevenDays = this.calcAvailableToClaimGift()

        store.dispatch(setGiftsData({
            giftType: 'sevenDaysGifts',
            giftData: this.sevenDaysGifts
        }))

        if(ENABLE_SEVEN_DAYS_GIFT && isSevenDays && !isFinished){
            store.dispatch(setSevenDaysGiftPopup({visible: true, data: null}))
        }
    }

    calcAvailableToClaimGift = () =>{
        let count = 0
        this.sevenDaysGifts.forEach(item=>{
            if(item.isAvailableClaim && !item.isClaimed){
                count += 1
            }
        })

        store.dispatch(setAvailableToClaimGift(count))

        return count > 0
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} sevenDaysGifts: ${this.sevenDaysGifts.length}`);
        }
    }

}