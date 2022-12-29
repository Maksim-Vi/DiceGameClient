import {store} from "../../../redux/redux-store";
import {setAllTranslations} from "../../../redux/reducers/language/LanguageReducer";
import {updateCurrentUserLanguage} from "../../../redux/reducers/players/PlayersReducer";

export default class S_LANGUAGE_INFO {
    constructor(phrases,language){

        this.MESSAG_ENAME = 'S_LANGUAGE_INFO'
        this.showLog = false

        this.phrases = phrases
        this.language = language

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setAllTranslations(this.phrases))
        store.dispatch(updateCurrentUserLanguage(this.language))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} data:`, this.phrases);
        }
    }

}