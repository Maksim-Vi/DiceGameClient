import {setUsersOnline} from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";

export default class S_USERS_ONLINE {
    constructor(usersOnline){

        this.MESSAG_ENAME = 'S_USERS_ONLINE'
        this.showLog = false

        this.usersOnline = usersOnline

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setUsersOnline(this.usersOnline))

        setTimeout(()=>{
            store.setAuth()
        },2000)
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} online: ${this.usersOnline}`);
        }
    }

}