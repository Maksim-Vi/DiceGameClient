import NewsManager from "../../../managers/News/NewsManager";
import { setNews, setUnreadedNews } from "../../../redux/reducers/News/NewsReducer";
import { selectMyUser } from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";
import {isProduction} from "../../../utils/utils";
import { getNews } from '../../API/API';

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

    async loadNews() {
        NewsManager.getNews();
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME}`);
        }
    }

}