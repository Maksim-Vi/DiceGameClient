import S_COLLECTIONS from "./messages/server/collection/S_COLLECTIONS";

export const collectionHendleMessage = (data) =>{
    switch (data.name) {
        case 'S_COLLECTIONS':
            new S_COLLECTIONS(data)
            break;
        default:
            break;
    }
}