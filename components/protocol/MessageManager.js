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
import S_SEVEN_DAYS_GIFTS from "./messages/server/gifts/S_SEVEN_DAYS_GIFTS";
import {giftsHandlerMessage} from "./GiftsMessageManager";
import S_RECONNECT_FAILED from "./messages/server/S_RECONNECT_FAILED";
import S_RECONNECT_SUCCESS from "./messages/server/S_RECONNECT_SUCCESS";

export const hendleMessage = (data) =>{
    switch (data.name) {
        case 'S_CLIENT_LOADED':
            new S_CLIENT_LOADED(data.clientId)
            
            break;
        case 'S_PONG':
            new S_PONG(data)
            break;


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
        case 'S_USERS_ONLINE':{
            new S_USERS_ONLINE(data.usersOnline)
            break;
        }


        case 'TEST_SERVER':{
            alert('TEST_SERVER 13')
            break;
        }
        
        default:
            break;
    }

    gameHandlerMessage(data)
    usersHandlerMessage(data)
    collectionHandlerMessage(data)
    roadHandlerMessage(data)
    giftsHandlerMessage(data)
    window.chatManager.chatMassageHandler(data)
}