import S_PONG from './messages/server/S_PONG'
import S_LOGIN_SUCCESS from './messages/server/S_LOGIN_SUCCESS';
import S_LOGIN_FAILED from './messages/server/S_LOGIN_FAILED';
import S_CREATE_ACCOUNT_SUCCESS from './messages/server/S_CREATE_ACCOUNT_SUCCESS';
import S_CREATE_ACCOUNT_FAILED from './messages/server/S_CREATE_ACCOUNT_FAILED';
import S_CLIENT_LOADED from './messages/server/S_CLIENT_LOADED';
import { gameHandlerMessage } from './GameMessageManager';
import {usersHandlerMessage} from "./UsersMessageManager";
import {collectionHandlerMessage} from "./collectionMessageManager";
import {roadHandlerMessage} from "./RoadMessageManager";
import S_LANGUAGE_INFO from "./messages/server/S_LANGUAGE_INFO";
import S_USERS_ONLINE from "./messages/server/S_USERS_ONLINE";
import {giftsHandlerMessage} from "./GiftsMessageManager";
import S_RECONNECT_FAILED from "./messages/server/S_RECONNECT_FAILED";
import S_RECONNECT_SUCCESS from "./messages/server/S_RECONNECT_SUCCESS";
import S_SOUND_INFO from "./messages/server/S_SOUND_INFO";
import S_DEFAULT_PARAMS from "./messages/server/S_DEFAULT_PARAMS";
import S_USER_PARAMS from "./messages/server/S_USER_PARAMS";
import {friendsHandlerMessage} from "./FriendsMessageManager";
import S_SERVER_WORKS_START_TIME from "./messages/server/S_SERVER_WORKS_START_TIME";
import S_GAME_END_LOADED from "./messages/server/S_GAME_END_LOADED";

export const hendleMessage = (data) =>{
    switch (data.name) {
        case 'S_CLIENT_LOADED':
            new S_CLIENT_LOADED(data.clientId)
            
            break;
        case 'S_PONG':
            new S_PONG(data)
            break;


        case 'S_GAME_END_LOADED':{
            new S_GAME_END_LOADED()
            break;
        }
        case 'S_LOGIN_SUCCESS':{
            new S_LOGIN_SUCCESS(data.message)
            break;
        }
        case 'S_LOGIN_FAILED':{
            new S_LOGIN_FAILED(data)
            break;
        }
        case 'S_RECONNECT_SUCCESS':{
            new S_RECONNECT_SUCCESS(data.message)
            break;
        }
        case 'S_RECONNECT_FAILED':{
            new S_RECONNECT_FAILED(data.error)
            break;
        }
        case 'S_CREATE_ACCOUNT_SUCCESS':{
            new S_CREATE_ACCOUNT_SUCCESS(data)
            break;
        }
        case 'S_CREATE_ACCOUNT_FAILED':{
            new S_CREATE_ACCOUNT_FAILED(data)
            break;
        }
        case 'S_LANGUAGE_INFO':{
            new S_LANGUAGE_INFO(data.phrases, data.language)
            break;
        }
        case 'S_DEFAULT_PARAMS':{
            new S_DEFAULT_PARAMS(data.defaultParams, data.serverParams)
            break;
        }
        case 'S_USER_PARAMS':{
            new S_USER_PARAMS(data.userParams)
            break;
        }
        case 'S_USERS_ONLINE':{
            new S_USERS_ONLINE(data.usersOnline)
            break;
        }
        case 'S_SOUND_INFO':{
            new S_SOUND_INFO(data.username, data.sound)
            break;
        }
        case 'S_SERVER_WORKS_START_TIME':{
            new S_SERVER_WORKS_START_TIME(data.username, data.message, data.timeToStop, data.language)
            break;
        }


        case 'TEST_SERVER':{
            alert('TEST_SERVER 13')
            break;
        }
        
        default:
            break;
    }

    friendsHandlerMessage(data)
    gameHandlerMessage(data)
    usersHandlerMessage(data)
    collectionHandlerMessage(data)
    roadHandlerMessage(data)
    giftsHandlerMessage(data)
    window.chatManager.chatMassageHandler(data)
}