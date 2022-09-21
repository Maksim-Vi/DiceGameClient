import {store} from "../../../../redux/redux-store";
import {
    selectMyUser, updateCurrentUserCoins,
    updateCurrentUserCrystals,
    updateCurrentUserExp
} from "../../../../redux/reducers/players/PlayersReducer";

export default class S_UPDATE_USER_MONEY {
    constructor(coins, crystals){

        this.MESSAG_ENAME = 'S_UPDATE_USER_MONEY'
        this.showLog = true

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