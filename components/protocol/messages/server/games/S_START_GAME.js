import { setIsGameStarted } from "../../../../redux/reducers/game/GameReducer"
import { store } from "../../../../redux/redux-store"
import {transitionState} from "../../../../utils/utils";

export default class S_START_GAME {
    constructor(data){

        this.MESSAG_ENAME = 'S_START_GAME'
        this.showLog = true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setIsGameStarted(true))
        setTimeout(()=>{
            //window.navigation.navigate('GameScreen')
            transitionState('GameScreen')
        }, 2000)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}