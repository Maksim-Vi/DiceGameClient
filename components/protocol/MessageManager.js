import S_PONG from './messages/server/S_PONG'
import S_LOGIN_SUCCESS from './messages/server/S_LOGIN_SUCCESS';
import S_LOGIN_FAILED from './messages/server/S_LOGIN_FAILED';
import S_CREATE_ACCOUNT_SUCCESS from './messages/server/S_CREATE_ACCOUNT_SUCCESS';
import S_CREATE_ACCOUNT_FAILED from './messages/server/S_CREATE_ACCOUNT_FAILED';
import S_CLIENT_LOADED from './messages/server/S_CLIENT_LOADED';
import { gameHendleMessage } from './GameMessageManager';
import {usersHendleMessage} from "./UsersMessageManager";
import {collectionHendleMessage} from "./collectionMessageManager";

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
        case 'S_CREATE_ACCOUNT_SUCCESS':{
            new S_CREATE_ACCOUNT_SUCCESS(data)
            break;
        }
        case 'S_CREATE_ACCOUNT_FAILED':{
            new S_CREATE_ACCOUNT_FAILED(data)
            break;
        }


        case 'TEST_SERVER':{
            alert('TEST_SERVER 13')
            break;
        }
        
        default:
            break;
    }

    gameHendleMessage(data)
    usersHendleMessage(data)
    collectionHendleMessage(data)
}