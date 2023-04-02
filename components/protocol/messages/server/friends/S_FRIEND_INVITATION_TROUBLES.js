import {isProduction} from "../../../../utils/utils";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {store} from "../../../../redux/redux-store";
import {setInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";

export default class S_FRIEND_INVITATION_TROUBLES {
    constructor(username,friendUsername,reason,message){

        this.MESSAG_ENAME = 'S_FRIEND_INVITATION_TROUBLES'
        this.showLog = isProduction() ? false : true


        this.username = username
        this.friendUsername = friendUsername
        this.message = message
        this.reason = reason

        const toSameName = selectTranslation(store.getState(), 'TR_ERROR_TO_SAME_NAME')
        const alreadyExistsFriends = selectTranslation(store.getState(), 'TR_ERROR_FRIEND_ALREADY_EXISTS')
        const alreadyExistsInvitations = selectTranslation(store.getState(), 'TR_ERROR_FRIEND_ALREADY_INVITED')

        this.ReasonType = {
            toSameName: toSameName,
            alreadyExistsFriends: alreadyExistsFriends,
            alreadyExistsInvitations: alreadyExistsInvitations,
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
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`, this.friendUsername, this.message);
        }
    }
}