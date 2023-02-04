import {
    setActiveThrowBtn,
    setCarrentGameId, setCountScores,
    setGame,
    setGameSettings, setIsYouMove,
    setRestoreGame, setScores,
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

        this.getScores()

        store.dispatch(setCountScores({
            scoresUser: this.countScores.countScoresUser,
            scoresOpponent: this.countScores.countScoresOpponent
        }))
    }

    getScores = () =>{
        let mySide = null
        let oppSide = null
        this.activeGame.gameSettings.players.forEach(user=> {
            if(user.username === this.username){
                mySide = user.side
            } else {
                oppSide = user.side
            }
        })

        const myScores = this.activeGame.gameData[+mySide === 1 ? 'player1' : 'player2']
        const oppScores = this.activeGame.gameData[+oppSide === 1 ? 'player1' : 'player2']

        if(myScores && oppScores){
            store.dispatch(setScores({
                userId: null,
                username: null,
                userScores: myScores,
                opponentsScores: oppScores
            }))
        }
    }

    getUserData = () => {
        const myUser = selectMyUser(store.getState())
        if (myUser) {
            this.id = myUser.id
        }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} activeGame: ${JSON.stringify(this.activeGame)}`);
        }
    }

}