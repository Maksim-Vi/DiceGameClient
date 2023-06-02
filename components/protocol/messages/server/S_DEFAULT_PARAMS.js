import {store} from "../../../redux/redux-store";
import {setAllDefaultParams} from "../../../redux/reducers/language/LanguageReducer";
import {isProduction} from "../../../utils/utils";

export default class S_DEFAULT_PARAMS {
    constructor(defaultParams, serverParams){

        this.MESSAG_ENAME = 'S_DEFAULT_PARAMS'
        this.showLog = isProduction() ? false : true

        this.defaultParams = typeof defaultParams === "string" ? JSON.parse(defaultParams) : defaultParams
        this.serverParams = typeof serverParams === "string" ? JSON.parse(serverParams) : serverParams

        this.updatedParams = Object.assign({}, this.defaultParams, this.serverParams);
        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        console.log(this.updatedParams)
        store.dispatch(setAllDefaultParams(this.updatedParams))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} defaultParams: ${JSON.stringify(this.defaultParams)} serverParams: ${JSON.stringify(this.serverParams)}`);
        }
    }

}