import {isProduction} from "../../../../utils/utils";
import {store} from "../../../../redux/redux-store";
import {setFriends} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_GET_FRIENDS_INFO {
    constructor(username,userFriends,invitationsToFriends,invitationsFromFriends){

        this.MESSAG_ENAME = 'S_GET_FRIENDS_INFO'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.userFriends = userFriends
        this.invitationsToFriends = invitationsToFriends
        this.invitationsFromFriends = invitationsFromFriends

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setFriends({
            userFriends: this.userFriends ,
            invitationsToFriends: this.invitationsToFriends,
            invitationsFromFriends: this.invitationsFromFriends
        }))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`, this.userFriends, this.invitationsToFriends, this.invitationsFromFriends);
        }
    }
}