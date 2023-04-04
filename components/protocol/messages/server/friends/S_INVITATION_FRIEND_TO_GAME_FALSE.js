import {isProduction} from "../../../../utils/utils";
import {store} from "../../../../redux/redux-store";
import {setInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";

export default class S_INVITATION_FRIEND_TO_GAME_FALSE {
    constructor(username, friendUsername, success, message, reason) {

        this.MESSAG_ENAME = 'S_INVITATION_FRIEND_TO_GAME_FALSE'
        this.showLog = isProduction() ? false : true

        this.username = username
        this.friendUsername = friendUsername
        this.success = success
        this.message = message
        this.reason = reason


        const notFlash = selectTranslation(store.getState(), 'TR_NOT_FLASH')
        const notFlashOpp = selectTranslation(store.getState(), 'TR_ERROR_NOT_FLASH_IN_INVITED_OPPONENT')
        const invitedOpp = selectTranslation(store.getState(), 'TR_ERROR_OFFLINE_INVITATION')
        const invitedInGame = selectTranslation(store.getState(), 'TR_ERROR_OPPONENT_IN_GAME')

        this.ReasonType = {
            notFlash: notFlash,
            offline: invitedOpp,
            inGame: invitedInGame,
            notFlashFriend: notFlashOpp,
        }

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        if(this.ReasonType[this.reason]){
            store.dispatch(setInfoPopup({visible: true, data: {text: this.ReasonType[this.reason]}}))
        }

        // if(window.navigation){
        //     setTimeout(()=>{
        //         window.navigation.goBack()
        //     }, 1000)
        // }
    }

    getLogText() {
        if (this.showLog) {
            console.log(`${this.MESSAG_ENAME} username: ${this.username} diceScore: ${this.diceScore}`);
        }
    }

}