import gameIcon from "../../../../../assets/dice/bot2.png";
import vs_person1 from "../../../../../assets/dice/vs_person1.png";
import vs_time2 from "../../../../../assets/dice/vs_time2.png";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import {store} from "../../../../redux/redux-store";
import GameWithOpponentByTime from "./GameWithOpponentByTime";
import GameWithOpponent from "./GameWithOpponent";
import GameWithBot from "./GameWithBot";

export const gameListData = [
    {
        id: -1,
        type: 'empty',
    },
    {
        id: 0,
        type: 'bot',
        component: <GameWithBot />,
    },
    {
        id: 1,
        type: 'opponent',
        component: <GameWithOpponent />,
    },
    {
        id: 2,
        type: 'opponentByTime',
        component: <GameWithOpponentByTime />,
    },
    {
        id: -2,
        type: 'empty',
    },
]


export const getMarginLeftGameItem = (index) =>{
    if(index === 0){
        return 100
    }

    if(index === gameListData.length - 1){
        return -100
    }
}
