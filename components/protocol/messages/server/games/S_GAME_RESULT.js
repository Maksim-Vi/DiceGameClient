
import { store } from "../../../../redux/redux-store"
import {setResultGame} from "../../../../redux/reducers/game/GameReducer";

export default class S_GAME_RESULT {
    constructor(resultData){

        this.MESSAG_ENAME = 'S_GAME_RESULT'
        this.showLog = true

        this.resultData = resultData

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setResultGame(this.resultData))
        setTimeout(()=>{
            window.navigation.navigate('ResultScreen')
        },500)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} resultData: ${JSON.stringify(this.resultData)}`);
        }
    }

}