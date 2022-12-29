import S_COLLECTIONS from "./messages/server/collection/S_COLLECTIONS";
import S_BUY_GAME_ITEM from "./messages/server/collection/S_BUY_GAME_ITEM";
import S_SET_ACTIVE_GAME_ITEMS from "./messages/server/collection/S_SET_ACTIVE_GAME_ITEMS";

export const collectionHandlerMessage = (data) =>{
    switch (data.name) {
        case 'S_COLLECTIONS':
            new S_COLLECTIONS(data)
            break;
        case 'S_BUY_GAME_ITEM':
            new S_BUY_GAME_ITEM(data.availableCollectionItems,data.collectionType,data.itemId)
            break;
        case 'S_SET_ACTIVE_GAME_ITEMS':
            new S_SET_ACTIVE_GAME_ITEMS(data.activeItems)
            break;
        default:
            break;
    }
}