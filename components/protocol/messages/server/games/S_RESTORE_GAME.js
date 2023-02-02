import {setCarrentGameId, setGame, setGameSettings, setRestoreGame} from "../../../../redux/reducers/game/GameReducer";
import {store} from "../../../../redux/redux-store";

export default class S_RESTORE_GAME {
    constructor(username, activeGame){

        this.MESSAG_ENAME = 'S_RESTORE_GAME'
        this.showLog = true

        this.username = username
        this.activeGame = activeGame

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
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} activeGame: ${JSON.stringify(this.activeGame)}`);
        }
    }

}