import {store} from "../../../../redux/redux-store";
import {selectMyUser, updateCurrentUserExp} from "../../../../redux/reducers/players/PlayersReducer";
import {setLevelUpPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {isProduction} from "../../../../utils/utils";

export default class S_UPDATE_USER_EXP {
    constructor(lvl, levelExp,progress){

        this.MESSAG_ENAME = 'S_UPDATE_USER_EXP'
        this.showLog = isProduction() ? false : true

        this.lvl = lvl
        this.levelExp = levelExp
        this.progress = progress

        this.init()
    }

    init() {
        this.getLogText()
        this.selectUserData()
        this.exec()
    }

    exec() {
        if(this.user.experience.lvl < this.lvl){
            store.dispatch(setLevelUpPopup({visible: true, data: {
                newLvl: this.lvl,
                prevLvl: this.user.experience.lvl
            }}))
        }

        store.dispatch(updateCurrentUserExp({
            lvl: this.lvl,
            levelExp: this.levelExp,
            progress: this.progress
        }))
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())
        this.user = user
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} lvl: ${this.lvl} levelExp:${this.levelExp} progress: ${this.progress}`);
        }
    }

}