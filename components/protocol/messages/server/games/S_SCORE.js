
import { setScores } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"

export default class S_SCORE {
    constructor(userId, username, userScores, opponentsScores){

        this.MESSAG_ENAME = 'S_SCORE'
        this.showLog = true

        this.userId = userId
        this.username = username
        this.userScores = userScores
        this.opponentsScores = opponentsScores
        
        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setScores({userId: this.userId, username: this.username, userScores: this.userScores, opponentsScores: this.opponentsScores}))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} username: ${this.username} userScores: ${this.userScores} opponentsScores: ${this.opponentsScores}`);
        }
    }

}