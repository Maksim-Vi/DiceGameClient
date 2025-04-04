import {
    addAvailableCollectionItems,
} from "../../../../redux/reducers/collections/CollectionsReducer";
import {store} from "../../../../redux/redux-store";
import {isProduction} from "../../../../utils/utils";
import {setCollectItemPopup} from "../../../../redux/reducers/popups/PopupsReducer";

export default class S_BUY_GAME_ITEM {
    constructor(availableCollectionItems,collectionType,itemId){

        this.MESSAG_ENAME = 'S_BUY_GAME_ITEM'
        this.showLog = isProduction() ? false : true

        this.availableCollectionItems = availableCollectionItems
        this.collectionType = collectionType
        this.itemId = itemId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        if(this.availableCollectionItems){
            store.dispatch(addAvailableCollectionItems(this.availableCollectionItems))

            setTimeout(()=>{
                store.dispatch(setCollectItemPopup({visible: true, data: {
                        type: this.collectionType,
                        id: this.itemId
                    }}))
            },1000)
        }
    }

    getLogText() {
        if(this.showLog){
            console.log(`${this.MESSAG_ENAME} collectionType: ${this.collectionType} itemId: ${this.itemId}`);
        }
    }

}