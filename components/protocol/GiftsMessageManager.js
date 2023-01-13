import S_ROAD_INFO_MAP from "./messages/server/road/S_ROAD_INFO_MAP";
import S_UPDATE_MISSION_ROAD_MAP from "./messages/server/road/S_UPDATE_MISSION_ROAD_MAP";
import S_SEVEN_DAYS_GIFTS from "./messages/server/gifts/S_SEVEN_DAYS_GIFTS";
import C_GET_SEVEN_DAYS_GIFTS from "./messages/clients/gifts/C_GET_SEVEN_DAYS_GIFTS";
import S_UPDATE_SEVEN_DAYS_GIFTS from "./messages/server/gifts/S_UPDATE_SEVEN_DAYS_GIFTS";

export const giftsHandlerMessage = (data) => {
    switch (data.name) {
        case 'S_SEVEN_DAYS_GIFTS':{
            new S_SEVEN_DAYS_GIFTS(data.sevenDaysGifts)
            break;
        }
        case 'S_UPDATE_SEVEN_DAYS_GIFTS':{
            new S_UPDATE_SEVEN_DAYS_GIFTS(data)
            break;
        }
        default:
            break;
    }
}
