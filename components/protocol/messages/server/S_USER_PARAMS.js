import {store} from "../../../redux/redux-store";
import {setAllUserParams} from "../../../redux/reducers/language/LanguageReducer";
import {isProduction} from "../../../utils/utils";

export default class S_USER_PARAMS {
    constructor(userParams){

        this.MESSAG_ENAME = 'S_USER_PARAMS'
        this.showLog = isProduction() ? false : true

        this.userParams = userParams && typeof userParams === "string"
            ? JSON.parse(userParams)
            : userParams

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setAllUserParams(this.userParams))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} data:`, this.userParams);
        }
    }

}