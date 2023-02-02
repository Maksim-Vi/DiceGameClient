import {
    setActiveThrowBtn,
    setCarrentGameId, setCountScores,
    setGame,
    setGameSettings, setIsYouMove,
    setOpponentThrowData,
    setRestoreGame, setScores, setThrowData
} from "../../../../redux/reducers/game/GameReducer";
import {store} from "../../../../redux/redux-store";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_RESTORE_GAME {
    constructor(username, activeGame, countScores,lastThrow){

        this.MESSAG_ENAME = 'S_RESTORE_GAME'
        this.showLog = true

        this.id = null
        this.username = username
        this.activeGame = activeGame
        this.countScores = countScores
        this.lastThrow = lastThrow

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        console.log('ANSWER', this.username, this.lastThrow)
        store.dispatch(setRestoreGame(true))
        store.dispatch(setCarrentGameId(this.activeGame.gameSettings.gameId))
        store.dispatch(setGame(this.activeGame))
        store.dispatch(setGameSettings(this.activeGame.gameSettings))

        if(this.username !== this.lastThrow){
            store.dispatch(setActiveThrowBtn(true))
            store.dispatch(setIsYouMove(true))
        } else {
            store.dispatch(setActiveThrowBtn(false))
        }

        store.dispatch(setCountScores({
            scoresUser: this.countScores.countScoresUser,
            scoresOpponent: this.countScores.countScoresOpponent
        }))
    }

    getUserData = () => {
        const myUser = selectMyUser(store.getState())
        if (myUser) {
            this.id = myUser.id
            //this.username = myUser.username
        }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} activeGame: ${JSON.stringify(this.activeGame)}`);
        }
    }

}