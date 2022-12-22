
import S_CREATED_GAME from './messages/server/games/S_CREATED_GAME';
import S_UPDATE_USER_EXP from "./messages/server/users/S_UPDATE_USER_EXP";
import S_UPDATE_USER_FLASH from "./messages/server/users/S_UPDATE_USER_FLASH";
import S_UPDATE_USER_MONEY from "./messages/server/users/S_UPDATE_USER_MONEY";

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
        default:
            break;
    }
}