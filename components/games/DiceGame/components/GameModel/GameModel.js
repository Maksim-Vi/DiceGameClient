import { selectMyUser } from "../../../../redux/reducers/players/PlayersReducer"
import BoardCalculator from "./BoardCalculator"

class GameModel {
    constructor(props){
        this.props = props

        this.state = props.store
        this.currentGame = null
        this.gameSettings = null

        this.user = {}
        this.opponent = {username: ''}

        this.userBoard = []
        this.opponentBoard = []

        this.userWinPoints = []
        this.opponentWinPoints = []

        this.init()
    }

    init(){
        this.currentGame = this.props.currentGame
        this.gameSettings = this.props.gameSettings
        this.boardCalculator = new BoardCalculator()
    }

    setData(currentGame,gameSettings){
        if(!currentGame && !gameSettings) return null

        this.currentGame = currentGame
        this.gameSettings = gameSettings

        this.initGame()
    }

    initGame(){
        this.getUsers()
        this.setUserBoard()
        this.setOpponentBoard()
    }

    getUsers() {
        if(!this.gameSettings.players || this.gameSettings.players.length === 0) return

        const myUser = selectMyUser(this.state.getState())
        
        this.gameSettings.players.forEach(user => {
            if(user.id === myUser.id){
                this.user = user
            } else {
                this.opponent = user
            }
        });
    }

    getBoardData(){
        return {
            userBoard: this.userBoard,
            opponentBoard: this.opponentBoard
        }
    }

    getWinPointsData(){
        return {
            userWinPoints: this.userWinPoints,
            opponentWinPoints: this.opponentWinPoints
        }
    }

    setUserBoard(){
        const data = this.user.side === 1 
            ? this.currentGame.gameData.player1 
            : this.currentGame.gameData.player2

        this.userBoard = this.boardCalculator.userBoardCalculate(data)
    }

    setOpponentBoard(){
        const data = this.user.side === 1 
            ? this.currentGame.gameData.player1 
            : this.currentGame.gameData.player2

        this.opponentBoard = this.boardCalculator.opponentBoardCalculate(data)
    }


    updateScores = (userScores, opponentsScores) =>{
        this.updateUserBoard(userScores)
        this.updateOpponentBoard(opponentsScores)

        return this.getBoardData()
    }


    updateUserBoard(updatedScore){
        this.userBoard = updatedScore
        this.userWinPoints = this.boardCalculator.userPointsCalculate(updatedScore)
    }

    updateOpponentBoard(updatedScore){
        this.opponentBoard = updatedScore
        this.opponentWinPoints = this.boardCalculator.opponentPointsCalculate(updatedScore)
    }

    get _opponent() {
        return this.opponent
    }
}

export default GameModel