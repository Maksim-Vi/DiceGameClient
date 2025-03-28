import {setActiveItems, setCurrentUser} from "../../../redux/reducers/players/PlayersReducer"
import { store } from "../../../redux/redux-store"
import {addAvailableCollectionItems} from "../../../redux/reducers/collections/CollectionsReducer";
import {setLeftTimeShowAd} from "../../../redux/reducers/AD/AdvertisingReducer";
import {setIsFinishedGift} from "../../../redux/reducers/gifts/GiftsReducer";
import {setSoundInfo} from "../../../redux/reducers/language/LanguageReducer";
import {isProduction} from "../../../utils/utils";

export default class S_LOGIN_SUCCESS {
    constructor(data){

        this.MESSAG_ENAME = 'S_LOGIN_SUCCESS'
        this.showLog = isProduction() ? false : true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setCurrentUser(this.data.user))
        store.dispatch(setSoundInfo(this.data.user.isSoundOn))
        store.dispatch(setIsFinishedGift({isFinishGiftType: 'isFinishedSevenDayGifts', finishData: this.data.user.isSevenDaysGiftsFinished}))
        store.dispatch(setLeftTimeShowAd(this.data.user.giftWatchedTime))
        store.dispatch(setActiveItems(this.data.user.activeItems || {dice: 1, square: 1000}))
        store.dispatch(addAvailableCollectionItems(this.data.user.availableCollectionItems || {dice: [13], square: [14],gameBackgrounds:[1]}))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}