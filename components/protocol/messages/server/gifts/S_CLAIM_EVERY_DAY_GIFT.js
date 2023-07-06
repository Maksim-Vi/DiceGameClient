import { setEveryDayGiftResult } from "../../../../redux/reducers/gifts/GiftsReducer";
import { setEveryDaysGiftPopup } from "../../../../redux/reducers/popups/PopupsReducer";
import { store } from "../../../../redux/redux-store";
import { isProduction } from "../../../../utils/utils";

export default class S_CLAIM_EVERY_DAY_GIFT {
  constructor(username, rewardValue, rewardType, rewardQuantity) {
    this.MESSAG_ENAME = "S_CLAIM_EVERY_DAY_GIFT";
    this.showLog = isProduction() ? false : true;

    this.MyUsername = null;

    this.username = username;
    this.rewardValue = rewardValue || 0;
    this.rewardType = rewardType || "coins";
    this.rewardQuantity = rewardQuantity || 0;

    this.init();
  }

  init() {
    this.getLogText();
    this.exec();
  }

  exec() {
    if(this.username){
        store.dispatch(
            setEveryDayGiftResult({
              username: this.username,
              rewardValue: this.rewardValue,
              rewardType: this.rewardType,
              rewardQuantity: this.rewardQuantity,
            })
        );
    } else {
        store.dispatch(setEveryDaysGiftPopup({visible: false, data: null}))
    }
  }

  getLogText() {
    if (this.showLog) {
      console.log(`${this.MESSAG_ENAME}`);
    }
  }
}
