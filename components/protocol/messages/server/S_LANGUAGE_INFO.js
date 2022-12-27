import {store} from "../../../redux/redux-store";
import {setAllTranslations} from "../../../redux/reducers/language/LanguageReducer";

export default class S_LANGUAGE_INFO {
    constructor(phrases){

        this.MESSAG_ENAME = 'S_LANGUAGE_INFO'
        this.showLog = false

        this.phrases = phrases

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setAllTranslations(this.phrases))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} data:`, this.phrases);
        }
    }

}