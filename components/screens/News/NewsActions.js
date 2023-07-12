import {setFreeGiftsPopup} from "../../redux/reducers/popups/PopupsReducer";
import {store} from "../../redux/redux-store";

export const newsActionsTypes = {
    Link: 'link',
    Redirect: 'redirect',
    Coins: 'coins',
    Diamonds: 'crystals',
    CoinsDiamonds: 'coins-crystals',
    ItemsCoins: 'combi',
}

export const CallToActions = (actions = null) => {

    if(actions){
        switch (actions.type){
            case newsActionsTypes.Link: {
                break
            }
            case newsActionsTypes.Redirect: {
                break
            }
            case "gift": {
                switch (actions.giftType){
                    case newsActionsTypes.Coins:{
                        store.dispatch(setFreeGiftsPopup({
                            visible: true,
                            data: {
                                type: actions.giftType,
                                coins: actions.reward,
                                diamonds: null
                            }
                        }))
                        break
                    }
                    case newsActionsTypes.Diamonds:{
                        store.dispatch(setFreeGiftsPopup({
                            visible: true,
                            data: {
                                type: actions.giftType,
                                coins: null,
                                diamonds: actions.reward
                            }
                        }))
                        break
                    }
                    case newsActionsTypes.CoinsDiamonds:{
                        store.dispatch(setFreeGiftsPopup({
                            visible: true,
                            data: {
                                type: actions.giftType,
                                coins: actions.reward[0],
                                diamonds: actions.reward[1]
                            }
                        }))
                        break
                    }
                    default: return null
                }
            }
            default: return null;
        }
    }
}