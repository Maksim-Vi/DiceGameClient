
import {setOpponentThrowData, setScores, setThrowData} from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_SCORE {
    constructor(userId, username, userScores, opponentsScores){

        this.MESSAG_ENAME = 'S_SCORE'
        this.showLog = true

        this.userId = userId
        this.username = username
        this.userScores = userScores
        this.opponentsScores = opponentsScores
        this.currentUsername = ''

        this.init()
    }

    init() {
        this.getLogText()
        this.selectUserData()
        this.exec()
    }

    exec() {
        if(this.currentUsername !== this.username){
            store.dispatch(setOpponentThrowData(null))
        } else {
            store.dispatch(setThrowData(null))
        }
        store.dispatch(setScores({userId: this.userId, username: this.username, userScores: this.userScores, opponentsScores: this.opponentsScores}))
    }

    selectUserData = () =>{
        const user = selectMyUser(store.getState())
        this.currentUsername = user.username
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} username: ${this.username} userScores: ${this.userScores} opponentsScores: ${this.opponentsScores}`);
        }
    }

}