import {addAvailableCollectionItems} from "../../../../redux/reducers/collections/CollectionsReducer";

export default class S_BUY_GAME_ITEM {
    constructor(availableCollectionItems){

        this.MESSAG_ENAME = 'S_BUY_GAME_ITEM'
        this.showLog = false

        this.availableCollectionItems = availableCollectionItems

        this.init()
    }

    init() {
        this.exec()
        this.getLogText()
    }

    exec() {
        store.dispatch(addAvailableCollectionItems(this.availableCollectionItems))
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} itemId: ${this.itemId}`);
        }
    }

}