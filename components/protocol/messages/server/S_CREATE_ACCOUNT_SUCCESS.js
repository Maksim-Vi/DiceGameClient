import {store} from "../../../redux/redux-store";
import {setCurrentUser} from "../../../redux/reducers/players/PlayersReducer";

export default class S_CREATE_ACCOUNT_SUCCESS {
    constructor(data){

        this.MESSAG_ENAME = 'S_CREATE_ACCOUNT_SUCCESS'
        this.showLog = true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.login(this.data)
        store.dispatch(setCurrentUser(this.data.user))
        setTimeout(()=>{
            window.navigation.navigate('MainScreen')
        },1500)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} data:`, this.data);
        }
    }

}