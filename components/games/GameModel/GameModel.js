import Dispatcher from "../Events/Dispatcher";
import {transitionState} from "../../utils/utils";
import BoardCalculator from "./BoardCalculator";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";
import {store} from "../../redux/redux-store";
import {
    selectCountScores,
    selectCurrentGameId,
    selectGame,
    selectGameSettings,
    selectIsYouMove,
    selectOpponentThrowData,
    selectScores,
    selectThrowData, setGameJoined, setGameStarted,
} from "../../redux/reducers/game/GameReducer";

export default new class GameModel {
    constructor() {

        this._isGameStarted = null

        this._gameId = null
        this._gameSettings = null
        this._currentGame = null

        this._isYouMove = false
        this._throwData = 0

        this._countScores = {
            scoresUser: 0,
            scoresOpponent: 0
        }

        this._user = null
        this._opponent = null

        this._userBoard = []
        this._opponentBoard = []

        this._restoreGameData = {}

        this.boardCalculator = new BoardCalculator()

        this.addListeners();
    }

    init() {
        Dispatcher.dispatch('model:init');
    }

    initGame(){
        this._loadUsers()
        this._loadUserBoard()
        this._loadOpponentBoard()
    }

    addListeners() {}

    setGameData = (gameSettings, currentGame) =>{
        this._destroyData()

        store.dispatch(setGameJoined(true))

        this.gameId = gameSettings.gameId

        this.gameSettings = gameSettings
        this.currentGame = currentGame

        this.initGame()
    }

    setGameStarted = (isStarted, transition = false, transitionTime = 1000) =>{
        this.isGameStarted = isStarted

        if(isStarted && transition){
            setTimeout(()=>{
                transitionState('GameScreen')
            }, transitionTime)
        }
    }

    loadRestoreGameData = () =>{
        let gameId, currentGame, gameSettings, isYouMove, countScores, boardData,userThrowData,opponentThrowData, throwData
        this._destroyData()

        gameId = selectCurrentGameId(store.getState())
        currentGame = selectGame(store.getState())
        gameSettings = selectGameSettings(store.getState())
        isYouMove = selectIsYouMove(store.getState())
        countScores = selectCountScores(store.getState())
        boardData = selectScores(store.getState())

        userThrowData = selectThrowData(store.getState())
        opponentThrowData = selectOpponentThrowData(store.getState())

        throwData = isYouMove
            ? userThrowData
            : opponentThrowData

        this.restoreGameData = {
            gameId: gameId,
            currentGame: currentGame,
            gameSettings: gameSettings,
            isYouMove: isYouMove,
            countScores: countScores,
            boardData: boardData,
            throwData: throwData ? throwData.diceScore : null,
            lastThrowData: throwData
        }

        this.setGameData(gameSettings, currentGame)
    }

    updateRestoreGameBot = (userScores, opponentScores,countScoresUser,countScoresOpponent) =>{
        this.setIsYouMove(true)
        this.setScores(userScores, opponentScores)
        this.setUsersMaxScores(countScoresUser,countScoresOpponent)
        this.loadRestoreGameData()
    }

    setGameRestore = () =>{
        this.setScores(this.restoreGameData.boardData.userScores,this.restoreGameData.boardData.opponentsScores)
        this.setUsersMaxScores(this.restoreGameData.countScores.scoresUser,this.restoreGameData.countScores.scoresOpponent)

        if(
            this.restoreGameData.lastThrowData &&
            this.restoreGameData.lastThrowData.username.toLowerCase() === 'bot'
        ){
            this.setIsYouMove(true)
            return 'throwState'
        }

        this.isYouMove = this.restoreGameData.isYouMove

        return this.restoreGameData.throwData ? 'throwResultState' : 'throwState'
    }

    setIsYouMove = (isMove) =>{
        this._isYouMove = isMove

        if(isMove){
            Dispatcher.dispatch('model:startUserThrow', null)
        } else {
            Dispatcher.dispatch('model:startOpponentThrow', null)
        }
    }

    setThrowData = (data) => {
        this.throwData = data

        Dispatcher.dispatch('model:throw', null)
    }

    setUsersMaxScores = (scoresUser,scoresOpponent) => {
        this.countScores = {
            scoresUser: scoresUser,
            scoresOpponent: scoresOpponent
        }

        Dispatcher.dispatch('model:updateMaxScores', null)
    }

    setScores = (userScores, opponentScores) =>{
        this.throwData = null
        this.userBoard = this.boardCalculator.userBoardCalculate(userScores)
        this.opponentBoard = this.boardCalculator.opponentBoardCalculate(opponentScores)

        Dispatcher.dispatch('model:updateBoards', null);
    }

    calcPoints = (board) =>{
        return this.boardCalculator.userPointsCalculate(board)
    }

    destroyGame = () =>{
        this._destroyData()
    }

    _loadUsers() {
        if(!this.gameSettings.players || this.gameSettings.players.length === 0) return

        const myUser = selectMyUser(store.getState())

        this.gameSettings.players.forEach(user => {
            if(user.id === myUser.id){
                this.user = user
            } else {
                this.opponent = user
            }
        });
    }

    _loadUserBoard(){
        const data = this.user.side === 1
            ? this.currentGame.gameData.player1
            : this.currentGame.gameData.player2

        this.userBoard = this.boardCalculator.userBoardCalculate(data)
    }

    _loadOpponentBoard(){
        const data = this.opponent.side === 1
            ? this.currentGame.gameData.player1
            : this.currentGame.gameData.player2

        this.opponentBoard = this.boardCalculator.opponentBoardCalculate(data)
    }

    _destroyData = () =>{
        store.dispatch(setGameJoined(false))
        this.isGameStarted = null

        this.gameId = null
        this.gameSettings = null
        this.currentGame = null

        this.isYouMove = false
        this.throwData = 0

        this.countScores = {
            scoresUser: 0,
            scoresOpponent: 0
        }

        this.user = null
        this.opponent = null

        this.userBoard = []
        this.opponentBoard = []
    }

    get isGameStarted() {
        return this._isGameStarted;
    }

    set isGameStarted(value) {
        this._isGameStarted = value;
    }

    get gameId() {
        return this._gameId;
    }

    set gameId(value) {
        this._gameId = value;
    }

    get currentGame() {
        return this._currentGame;
    }

    set currentGame(value) {
        this._currentGame = value;
    }

    get gameSettings() {
        return this._gameSettings;
    }

    set gameSettings(value) {
        this._gameSettings = value;
    }

    get isYouMove() {
        return this._isYouMove;
    }

    set isYouMove(value) {
        this._isYouMove = value;
    }

    get throwData() {
        return this._throwData;
    }

    set throwData(value) {
        this._throwData = value;
    }

    get countScores() {
        return this._countScores;
    }

    set countScores(value) {
        this._countScores = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get opponent() {
        return this._opponent;
    }

    set opponent(value) {
        this._opponent = value;
    }

    get userBoard() {
        return this._userBoard;
    }

    set userBoard(value) {
        this._userBoard = value;
    }

    get opponentBoard() {
        return this._opponentBoard;
    }

    set opponentBoard(value) {
        this._opponentBoard = value;
    }

    get restoreGameData() {
        return this._restoreGameData;
    }

    set restoreGameData(value) {
        this._restoreGameData = value;
    }
}()
