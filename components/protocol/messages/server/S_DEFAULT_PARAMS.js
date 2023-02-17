import {store} from "../../../redux/redux-store";
import {setAllDefaultParams} from "../../../redux/reducers/language/LanguageReducer";
import {isProduction} from "../../../utils/utils";

export default class S_DEFAULT_PARAMS {
    constructor(defaultParams){

        this.MESSAG_ENAME = 'S_DEFAULT_PARAMS'
        this.showLog = isProduction() ? false : true

        this.defaultParams = typeof defaultParams === "string" ? JSON.parse(defaultParams) : defaultParams

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(setAllDefaultParams(this.defaultParams))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} data:`, this.defaultParams);
        }
    }

}