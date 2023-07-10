import {store} from "../../../redux/redux-store";
import {closeAllPopupsPopup, setInfoPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {delay, isProduction} from "../../../utils/utils";

export default class S_LOGIN_FAILED {
    constructor(data){

        this.MESSAG_ENAME = 'S_LOGIN_FAILED'
        this.showLog = isProduction() ? false : true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(closeAllPopupsPopup(false))
        
        store.logout(this.data.message && this.data.message.isServerWorks ? this.data.message.isServerWorks : false)

        delay(1000).then(()=>{
            store.dispatch(setInfoPopup({visible: true, data: {text: this.data.error}}))
        })
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} data:`, this.data);
        }
    }

}