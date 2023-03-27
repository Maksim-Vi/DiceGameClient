import S_FRIEND_INVITATION_TROUBLES from "./messages/server/friends/S_FRIEND_INVITATION_TROUBLES";
import S_GET_DETAIL_FRIEND_INFO from "./messages/server/friends/S_GET_DETAIL_FRIEND_INFO";
import S_GET_FRIENDS_INFO from "./messages/server/friends/S_GET_FRIENDS_INFO";
import S_SEND_FRIEND_INVITATION_TO_GAME from "./messages/server/friends/S_SEND_FRIEND_INVITATION_TO_GAME";
import S_INVITATION_FRIEND_TO_GAME_FALSE from "./messages/server/friends/S_INVITATION_FRIEND_TO_GAME_FALSE";
import S_FRIEND_ACCEPTED_INVITATION from "./messages/server/friends/S_FRIEND_ACCEPTED_INVITATION";

export const friendsHandlerMessage = (data) => {
    switch (data.name) {
        case 'S_FRIEND_INVITATION_TROUBLES':
            new S_FRIEND_INVITATION_TROUBLES(data.username,data.friendUsername,data.message)
            break;
        case 'S_GET_DETAIL_FRIEND_INFO':
            new S_GET_DETAIL_FRIEND_INFO(data.username,data.userFriend)
            break;
        case 'S_GET_FRIENDS_INFO':
            new S_GET_FRIENDS_INFO(data.username,data.userFriends,data.invitationsToFriends,data.invitationsFromFriends)
            break;
        case 'S_SEND_FRIEND_INVITATION_TO_GAME':
            new S_SEND_FRIEND_INVITATION_TO_GAME(data.gameId, data.username, data.friendUsername)
            break;
        case 'S_INVITATION_FRIEND_TO_GAME_FALSE':
            new S_INVITATION_FRIEND_TO_GAME_FALSE(data.username, data.friendUsername, data.success, data.message, data.reason)
            break;
        case 'S_FRIEND_ACCEPTED_INVITATION':
            new S_FRIEND_ACCEPTED_INVITATION(data.gameId, data.username, data.friendUsername)
            break;
        default:
            break;
    }
}
