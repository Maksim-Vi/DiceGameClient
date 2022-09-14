import {AsyncStorage} from "react-native";
import {useContext} from "react";
import {UserContext} from "../../../utils/UserProvider";
import {store} from "../../../redux/redux-store";

export default class S_LOGIN_FAILED {
    constructor(data){

        this.MESSAG_ENAME = 'S_LOGIN_FAILED'
        this.showLog = true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.logout()
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} data:`, this.data);
        }
    }

}