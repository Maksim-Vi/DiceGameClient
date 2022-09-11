
import {setOpponentThrowData, setThrowData} from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"

export default class S_OPPONENT_THROW {
    constructor(userId,username,diceScore){

        this.MESSAG_ENAME = 'S_OPPONENT_THROW'
        this.showLog = true

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
      store.dispatch(setThrowData(null))
      store.dispatch(setOpponentThrowData({userId: this.userId, username: this.username, diceScore: this.diceScore}))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} username: ${this.username} diceScore: ${this.diceScore}`);
        }
    }

}