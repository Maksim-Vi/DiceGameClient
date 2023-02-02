
import S_CREATED_GAME from './messages/server/games/S_CREATED_GAME';
import C_JOIN_TO_GAME from './messages/clients/games/C_JOIN_TO_GAME';
import S_JOIN_SUCCESS from './messages/server/games/S_JOIN_SUCCESS';
import S_WAITING_OPPONENT from './messages/server/games/S_WAITING_OPPONENT';
import S_GAME_SETTINGS from './messages/server/games/S_GAME_SETTINGS';
import S_START_GAME from './messages/server/games/S_START_GAME';
import S_OPPONENT_MOVE from './messages/server/games/S_OPPONENT_MOVE';
import S_YOU_MOVE from './messages/server/games/S_YOU_MOVE';
import S_SCORE from './messages/server/games/S_SCORE';
import S_THROW from './messages/server/games/S_THROW';
import S_GAME_RESULT from './messages/server/games/S_GAME_RESULT';
import S_GAME_FINISHED from './messages/server/games/S_GAME_FINISHED';
import S_LEAVE_GAME from './messages/server/games/S_LEAVE_GAME';
import S_OPPONENT_THROW from "./messages/server/games/S_OPPONENT_THROW";
import S_COUNT_SCORES from "./messages/server/games/S_COUNT_SCORES";
import S_GAME_BROKEN from "./messages/server/games/S_GAME_BROKEN";
import S_CAN_JOIN_TO_GAME from "./messages/server/games/S_CAN_JOIN_TO_GAME";
import S_USER_LOST_CONNECTION_IN_GAME from "./messages/server/games/S_USER_LOST_CONNECTION_IN_GAME";
import S_RESTORE_GAME from "./messages/server/games/S_RESTORE_GAME";

export const gameHandlerMessage = (data) =>{
    switch (data.name) {
        case 'S_CREATED_GAME':
            new S_CREATED_GAME(data.gameId)
            break;
        case 'S_CAN_JOIN_TO_GAME':
            new S_CAN_JOIN_TO_GAME(data.gameId)
            break;
        case 'S_JOIN_SUCCESS':
            new S_JOIN_SUCCESS(data)
            break;
        case 'S_WAITING_OPPONENT':
            new S_WAITING_OPPONENT(data)
            break;
        case 'S_GAME_SETTINGS':
            new S_GAME_SETTINGS(data.currentGame, data.gameSettings)
            break;
        case 'S_START_GAME':
            new S_START_GAME(data)
            break;

        case 'S_YOU_MOVE':
            new S_YOU_MOVE(data)
            break;
        case 'S_OPPONENT_MOVE':
            new S_OPPONENT_MOVE(data)
            break;
        case 'S_THROW':
            new S_THROW(data.userId, data.username, data.diceScore)
            break;
        case 'S_OPPONENT_THROW':
            new S_OPPONENT_THROW(data.userId, data.username, data.diceScore)
            break;
        case 'S_SCORE':
            new S_SCORE(data.userId, data.username, data.userScores, data.opponentsScores)
            break;
        case 'S_COUNT_SCORES':
            new S_COUNT_SCORES(data.scoresUser,data.scoresOpponent)
            break;
        case 'S_GAME_RESULT':
            new S_GAME_RESULT(data.resultData)
            break;
        case 'S_GAME_FINISHED':
            new S_GAME_FINISHED(data.gameId)
            break;
        case 'S_USER_LOST_CONNECTION_IN_GAME':
            new S_USER_LOST_CONNECTION_IN_GAME(data.leaveUsername, data.opponentUsername)
            break;
        case 'S_RESTORE_GAME':
            new S_RESTORE_GAME(data.username, data.activeGame, data.countScores, data.lastThrow)
            break;

        case 'S_LEAVE_GAME':
            new S_LEAVE_GAME(data.gameId)
            break;
        case 'S_GAME_BROKEN':
            new S_GAME_BROKEN(data.gameId)
            break;
        
        default:
            break;
    }
}