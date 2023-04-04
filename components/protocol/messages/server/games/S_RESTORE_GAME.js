import {
    setCarrentGameId, setCountScores,
    setGame,
    setGameSettings, setIsYouMove, setOpponentThrowData,
    setRestoreGame, setScores, setThrowData,
} from "../../../../redux/reducers/game/GameReducer";
import {store} from "../../../../redux/redux-store";
import {selectMyUser, setInvitedOpponent} from "../../../../redux/reducers/players/PlayersReducer";
import {isProduction} from "../../../../utils/utils";
import GameModel from "../../../../games/GameModel/GameModel";

export default class S_RESTORE_GAME {
    constructor(username, activeGame, countScores,lastThrow,lastThrowData){

        this.MESSAG_ENAME = 'S_RESTORE_GAME'
        this.showLog = isProduction() ? false : true

        this.id = null
        this.username = username
        this.activeGame = activeGame
        this.countScores = countScores
        this.lastThrowUser = lastThrow
        this.lastThrowData = lastThrowData

        this.init()
    }

    init() {
        this.getUserData()
        this.updateDataIfBot()
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setInvitedOpponent(null))
        store.dispatch(setRestoreGame(true))
        store.dispatch(setCarrentGameId(this.activeGame.gameSettings.gameId))
        store.dispatch(setGame(this.activeGame))
        store.dispatch(setGameSettings(this.activeGame.gameSettings))

        if(this.username !== this.lastThrowUser){
            store.dispatch(setIsYouMove(true))
        }

        this.getScores()

        store.dispatch(setCountScores({
            scoresUser: this.countScores.countScoresUser,
            scoresOpponent: this.countScores.countScoresOpponent
        }))

        this.setThrowData()
    }

    getScores = () =>{
        let mySide = null
        let oppSide = null
        this.activeGame.gameSettings.players.forEach(user=> {
            if(user.username.toLowerCase() === this.username.toLowerCase()){
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

        return {
            myScores, oppScores
        }
    }

    setThrowData = () =>{
        if(this.lastThrowData){
            if(this.lastThrowData.username === this.username){
                store.dispatch(setIsYouMove(true))
                return store.dispatch(setThrowData({
                    userId: this.lastThrowData.userId,
                    username: this.lastThrowData.username,
                    diceScore: this.lastThrowData.diceScore,
                }))
            }

            if(this.lastThrowData.username.toLowerCase() === 'bot'){
                store.dispatch(setIsYouMove(true))
                return store.dispatch(setThrowData({
                    userId: this.id,
                    username: this.username,
                    diceScore: null,
                }))
            }

            store.dispatch(setIsYouMove(false))
            return store.dispatch(setOpponentThrowData({
                userId: this.lastThrowData.userId,
                username: this.lastThrowData.username,
                diceScore: this.lastThrowData.diceScore,
            }))
        }

    }

    getUserData = () => {
        const myUser = selectMyUser(store.getState())
        if (myUser) {
            this.id = myUser.id
        }
    }

    updateDataIfBot = () =>{
        if(this.lastThrowUser.toLowerCase() === 'bot'){
            const {myScores,oppScores} = this.getScores()
            const countScoresUser = this.countScores.countScoresUser
            const countScoresOpponent = this.countScores.countScoresOpponent
            GameModel.updateRestoreGameBot(myScores, oppScores, countScoresUser,countScoresOpponent)
        }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} activeGame: ${JSON.stringify(this.activeGame)}`);
        }
    }

}