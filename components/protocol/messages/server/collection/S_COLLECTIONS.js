
import { store } from "../../../../redux/redux-store"
import {addGameItems, addShop} from "../../../../redux/reducers/collections/CollectionsReducer";

export default class S_COLLECTIONS {
    constructor(data){

        this.MESSAG_ENAME = 'S_COLLECTIONS'
        this.showLog = false

        this.data = data

        this.init()
    }

    init() {
        this.exec()
        this.getLogText()
    }

    exec() {
        const shop = this.data.shop || []
        const gameItems = this.data.gameItems || []
        const moneyItems = this.data.moneyItems || []

        store.dispatch(addShop(shop))
        store.dispatch(addGameItems(gameItems))
        //store.dispatch(addMoneyItems(moneyItems))
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME} collections: ${JSON.stringify(this.data.gameItems)} moneyItems: ${JSON.stringify(this.data.moneyItems)}`);
        }
    }

}