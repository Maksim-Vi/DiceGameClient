import S_CLAIM_EVERY_DAY_GIFT from "./messages/server/gifts/S_CLAIM_EVERY_DAY_GIFT";
import S_EVERY_DAY_GIFT from "./messages/server/gifts/S_EVERY_DAY_GIFT";
import S_SEVEN_DAYS_GIFTS from "./messages/server/gifts/S_SEVEN_DAYS_GIFTS";
import S_UPDATE_SEVEN_DAYS_GIFTS from "./messages/server/gifts/S_UPDATE_SEVEN_DAYS_GIFTS";

export const giftsHandlerMessage = (data) => {
    switch (data.name) {
        case 'S_SEVEN_DAYS_GIFTS':{
            new S_SEVEN_DAYS_GIFTS(data.sevenDaysGifts)
            break;
        }
        case 'S_UPDATE_SEVEN_DAYS_GIFTS':{
            new S_UPDATE_SEVEN_DAYS_GIFTS(data.sevenDaysGifts)
            break;
        }
        case 'S_EVERY_DAY_GIFT':{
            new S_EVERY_DAY_GIFT(data.username, data.rewards)
            break;
        }
        case 'S_CLAIM_EVERY_DAY_GIFT':{
            new S_CLAIM_EVERY_DAY_GIFT(data.username, data.rewardValue, data.rewardType, data.rewardQuantity)
            break;
        }
        default:
            break;
    }
}
