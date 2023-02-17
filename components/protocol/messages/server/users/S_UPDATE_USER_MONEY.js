import {store} from "../../../../redux/redux-store";
import {
    updateCurrentUserCoins,
    updateCurrentUserCrystals,
} from "../../../../redux/reducers/players/PlayersReducer";
import {isProduction} from "../../../../utils/utils";

export default class S_UPDATE_USER_MONEY {
    constructor(coins, crystals){

        this.MESSAG_ENAME = 'S_UPDATE_USER_MONEY'
        this.showLog = isProduction() ? false : true

        this.coins = coins
        this.crystals = crystals

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        store.dispatch(updateCurrentUserCoins(this.coins))
        store.dispatch(updateCurrentUserCrystals(this.crystals))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} coins: ${this.coins} crystals:${this.crystals}`);
        }
    }

}