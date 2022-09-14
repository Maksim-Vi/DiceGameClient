import { setCurrentUser } from "../../../redux/reducers/players/PlayersReducer"
import { store } from "../../../redux/redux-store"
import {useContext} from "react";
import {UserContext} from "../../../utils/UserProvider";

export default class S_LOGIN_SUCCESS {
    constructor(data){

        this.MESSAG_ENAME = 'S_LOGIN_SUCCESS'
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
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}