import { setGiftsData } from "../../../../redux/reducers/gifts/GiftsReducer";
import { selectDefaultParams } from "../../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../../redux/reducers/language/defaultParams";
import { setEveryDaysGiftPopup } from "../../../../redux/reducers/popups/PopupsReducer";
import { store } from "../../../../redux/redux-store";
import {isProduction} from "../../../../utils/utils";

export default class S_EVERY_DAY_GIFT {
    constructor(username, rewards){

        this.MESSAG_ENAME = 'S_EVERY_DAY_GIFT'
        this.showLog = isProduction() ? false : true
       
        this.username = username
        this.rewards = [1,2,3]

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setGiftsData({
            giftType: 'everyDaysGifts',
            giftData: this.rewards
        }))

        const ENABLE_EVERY_DAY_GIFT = selectDefaultParams(store.getState(), defaultParams.ENABLE_EVERY_DAY_GIFT)

        if(ENABLE_EVERY_DAY_GIFT){
            store.dispatch(setEveryDaysGiftPopup({visible: true, data: null}))
        }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}