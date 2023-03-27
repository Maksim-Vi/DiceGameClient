import {isProduction} from "../../../../utils/utils";
import {selectFriendsList} from "../../../../redux/reducers/players/friendsSelectors";
import {store} from "../../../../redux/redux-store";
import {setInvitedOpponent} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_FRIEND_ACCEPTED_INVITATION {
    constructor(gameId, username, friendUsername) {

        this.MESSAG_ENAME = 'S_FRIEND_ACCEPTED_INVITATION'
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

        store.dispatch(setInvitedOpponent({
            gameId: this.gameId,
            opponent: InvitedFriend
        }))
    }

    getLogText() {
        if (this.showLog) {
            console.log(`${this.MESSAG_ENAME} username: ${this.username} diceScore: ${this.diceScore}`);
        }
    }

}