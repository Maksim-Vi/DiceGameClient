import {store} from "../../../redux/redux-store";
import {isProduction} from "../../../utils/utils";

export default class S_GAME_END_LOADED {
    constructor(){

        this.MESSAG_ENAME = 'S_GAME_END_LOADED'
        this.showLog = isProduction() ? false : true

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        setTimeout(()=>{
            store.setAuth()
        },2000)
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} defaultParams: ${JSON.stringify(this.defaultParams)} serverParams: ${JSON.stringify(this.serverParams)}`);
        }
    }

}