
import S_CREATED_GAME from './messages/server/games/S_CREATED_GAME';
import S_UPDATE_USER_EXP from "./messages/server/users/S_UPDATE_USER_EXP";
import S_UPDATE_USER_FLASH from "./messages/server/users/S_UPDATE_USER_FLASH";
import S_UPDATE_USER_MONEY from "./messages/server/users/S_UPDATE_USER_MONEY";
import S_UPDATE_USER_STATISTICS from "./messages/server/users/S_UPDATE_USER_STATISTICS";
import S_UPDATE_USER_ADMOD_TIME from "./messages/server/users/S_UPDATE_USER_ADMOD_TIME";

export const usersHandlerMessage = (data) =>{
    switch (data.name) {
        case 'S_UPDATE_USER_EXP':
            new S_UPDATE_USER_EXP(data.lvl, data.levelExp, data.progress)
            break;
        case 'S_UPDATE_USER_FLASH':
            new S_UPDATE_USER_FLASH(data.status, data.flash)
            break;
        case 'S_UPDATE_USER_MONEY':
            new S_UPDATE_USER_MONEY(data.coins, data.crystals)
            break;
        case 'S_UPDATE_USER_STATISTICS':
            new S_UPDATE_USER_STATISTICS(data.statistics)
            break;
        case 'S_UPDATE_USER_ADMOD_TIME':
            new S_UPDATE_USER_ADMOD_TIME(data.updateTime)
            break;
        default:
            break;
    }
}