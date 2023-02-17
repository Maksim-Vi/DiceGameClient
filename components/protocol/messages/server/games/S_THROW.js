
import {setActiveThrowBtn, setOpponentThrowData, setThrowData} from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"
import {isProduction} from "../../../../utils/utils";

export default class S_THROW {
    constructor(userId,username,diceScore){

        this.MESSAG_ENAME = 'S_THROW'
        this.showLog = isProduction() ? false : true

        this.userId = userId
        this.username = username
        this.diceScore = diceScore
      
        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
      store.dispatch(setOpponentThrowData(null))
      store.dispatch(setThrowData({userId: this.userId, username: this.username, diceScore: this.diceScore}))
      store.dispatch(setActiveThrowBtn(false))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} username: ${this.username} diceScore: ${this.diceScore}`);
        }
    }

}