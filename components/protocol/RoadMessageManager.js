import S_ROAD_INFO_MAP from "./messages/server/road/S_ROAD_INFO_MAP";
import S_UPDATE_MISSION_ROAD_MAP from "./messages/server/road/S_UPDATE_MISSION_ROAD_MAP";

export const roadHandlerMessage = (data) => {
    switch (data.name) {
        case 'S_ROAD_INFO_MAP':
            new S_ROAD_INFO_MAP(data.username, data.missions)
            break;
        case 'S_UPDATE_MISSION_ROAD_MAP':
            console.log(data)
            new S_UPDATE_MISSION_ROAD_MAP(data.username, data.missions)
            break;
        default:
            break;
    }
}
