import { setGame, setGameSettings } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"

export default class S_GAME_SETTINGS {
    constructor(currentGame,gameSettings){

        this.MESSAG_ENAME = 'S_GAME_SETTINGS'
        this.showLog = true

        this.currentGame = currentGame
        this.gameSettings = gameSettings

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setGame(this.currentGame))
        store.dispatch(setGameSettings(this.gameSettings))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} game: ${JSON.stringify(this.currentGame)} gameSettings: ${JSON.stringify(this.gameSettings)}`);
        }
    }

}