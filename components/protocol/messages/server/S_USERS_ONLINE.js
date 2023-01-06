import EventDispatcher from "../../../redux/EventDispatcher";
import eventsType from "../../../redux/eventsType";
import {setUsersOnline} from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";

export default class S_USERS_ONLINE {
    constructor(usersOnline){

        this.MESSAG_ENAME = 'S_USERS_ONLINE'
        this.showLog = true

        this.usersOnline = usersOnline

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setUsersOnline(this.usersOnline))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} online: ${this.usersOnline}`);
        }
    }

}