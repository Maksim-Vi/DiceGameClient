import {isProduction} from "../../../../utils/utils";
import {setInvitationPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {store} from "../../../../redux/redux-store";
import {selectFriendsList} from "../../../../redux/reducers/players/friendsSelectors";

export default class S_SEND_FRIEND_INVITATION_TO_GAME {
    constructor(gameId, username, friendUsername) {

        this.MESSAG_ENAME = 'S_SEND_FRIEND_INVITATION_TO_GAME'
        this.showLog = isProduction() ? false : true

        this.gameId = gameId
        this.username = username
        this.friendUsername = friendUsername

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        const friends = selectFriendsList(store.getState())
        const InvitedFriend = friends.find(item=> item.username.toLowerCase() === this.friendUsername.toLowerCase())

        store.dispatch(setInvitationPopup({visible: true, data: {
                gameId: this.gameId,
                username: this.friendUsername,
                avatarId: InvitedFriend.avatar || 0,
                user: InvitedFriend
        }}))
    }

    getLogText() {
        if (this.showLog) {
            console.log(`${this.MESSAG_ENAME} gameId: ${this.gameId} friendUsername: ${this.friendUsername}`);
        }
    }

}