
import S_CREATED_GAME from './messages/server/games/S_CREATED_GAME';
import S_UPDATE_USER_EXP from "./messages/server/users/S_UPDATE_USER_EXP";
import S_UPDATE_USER_FLASH from "./messages/server/users/S_UPDATE_USER_FLASH";

export const usersHendleMessage = (data) =>{
    switch (data.name) {
        case 'S_UPDATE_USER_EXP':
            new S_UPDATE_USER_EXP(data.lvl, data.levelExp)
            break;
        case 'S_UPDATE_USER_FLASH':
            new S_UPDATE_USER_FLASH(data.status, data.flash)
            break;
        default:
            break;
    }
}