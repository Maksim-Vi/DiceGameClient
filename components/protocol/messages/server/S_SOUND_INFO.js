import {store} from "../../../redux/redux-store";
import {setSoundInfo} from "../../../redux/reducers/language/LanguageReducer";
import {updateCurrentUserSound} from "../../../redux/reducers/players/PlayersReducer";

export default class S_SOUND_INFO {
    constructor(username, sound){

        this.MESSAG_ENAME = 'S_SOUND_INFO'
        this.showLog = true

        this.username = username
        this.sound = sound

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setSoundInfo(this.sound))
        store.dispatch(updateCurrentUserSound(this.sound))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} sound: ${this.sound}`);
        }
    }

}