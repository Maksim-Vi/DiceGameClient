import {isProduction} from "../../../utils/utils";
import {store} from "../../../redux/redux-store";
import {setInfoPopup} from "../../../redux/reducers/popups/PopupsReducer";

export default class S_SERVER_WORKS_START_TIME {
    constructor(username, message, timeToStop, language){

        this.MESSAG_ENAME = 'S_SERVER_WORKS_START_TIME'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.message = message
        this.timeToStop = timeToStop
        this.language = language

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setInfoPopup({
            visible: true,
            data: {text: this.message + ` Time to stop server is ${this.timeToStop} minutes`}
        }))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}