import {setFreeGiftsPopup, setInfoPopup} from "../../redux/reducers/popups/PopupsReducer";
import {store} from "../../redux/redux-store";
import {Linking} from "react-native";
import {transitionState} from "../../utils/utils";

export const newsActionsTypes = {
    Link: 'link',
    Redirect: 'redirect',
    Coins: 'coins',
    Diamonds: 'crystals',
    CoinsDiamonds: 'coins-crystals',
    ItemsCoins: 'combi',
    Gift: "gift"
}

export const newsActionsRedirectTypes = {
    "collections": "CollectionsScreen",

    "collectionDices": "",
    "collectionFields": "",
    "collectionFrames": "",

    "road": "RoadScreen",
    "friends": "FriendsScreen",
    "userInfo": "UserInfoScreen",
    "shop": "ShopScreen",

}

export const CallToActions = (actions = null) => {
    if(actions){
        switch (actions.type){
            case newsActionsTypes.Link: {
                Linking.canOpenURL(actions.url).then(supported => {
                    if (supported) {
                        Linking.openURL(actions.url);
                    } else {
                        store.dispatch(setInfoPopup({visible: true, data: {text: 'Can not open the link! \n\n Thanks for understand, Knocky Dice team!'}}))
                    }
                });
                break
            }
            case newsActionsTypes.Redirect: {
                const redirectLink = newsActionsRedirectTypes[actions.path]

                if(redirectLink){
                    transitionState(redirectLink)
                }
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