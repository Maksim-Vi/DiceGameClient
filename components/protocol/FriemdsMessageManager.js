import S_FRIEND_INVITATION_TROUBLES from "./messages/server/friends/S_FRIEND_INVITATION_TROUBLES";
import S_GET_DETAIL_FRIEND_INFO from "./messages/server/friends/S_GET_DETAIL_FRIEND_INFO";
import S_GET_FRIENDS_INFO from "./messages/server/friends/S_GET_FRIENDS_INFO";

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
        default:
            break;
    }
}
