import NewsManager from "../../../managers/News/NewsManager";
import {store} from "../../../redux/redux-store";
import {isProduction} from "../../../utils/utils";
import {selectDefaultParams} from "../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../redux/reducers/language/defaultParams";

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
        this.loadNews();

        setTimeout(()=>{
            store.setAuth()
        },2000)
    }

     loadNews() {
         const ENABLE_NEWS = selectDefaultParams(store.getState(), defaultParams.ENABLE_NEWS)

         if(ENABLE_NEWS){
             NewsManager.getNews();
         }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}