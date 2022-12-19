import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const typesRoadBtns = {
    locked: 1,
    ready: 2,
    claimed: 3,
}

export const roadMap = [
    {
        id: 0,
        pos:{top: height / 1.25, left: width / 4},
        posSE:{top: height - 120, left: 90},
        type: typesRoadBtns.claimed,
        price: 1,
        rewardType: 'coins'
    },
    {
        id: 1,
        pos:{top: height / 1.23, left: width / 2},
        posSE:{top: height - 110, left: width / 2},
        type: typesRoadBtns.ready,
        price: 1,
        rewardType: 'coins'
    },
    {
        id: 2,
        pos:{top: height / 1.3, left: width / 1.3},
        posSE:{top: height - 150, left: width / 1.3},
        type: typesRoadBtns.locked,
        price: 3,
        rewardType: 'coins'
    },
    {
        id: 3,
        pos:{top: height / 1.55, left: width / 1.8},
        posSE:{top: height - 230, left: width / 1.8},
        type: typesRoadBtns.locked,
        price: 3,
        rewardType: 'coins'
    },
    {
        id: 4,
        pos:{top: height / 1.65, left: width / 6.5},
        posSE:{top: height - 280, left: width / 5},
        type: typesRoadBtns.locked,
        price: 1,
        rewardType: 'diamonds'
    },
    {
        id: 5,
        pos:{top: height / 2, left: width / 3},
        type: typesRoadBtns.locked,
        price: 1,
        rewardType: 'diamonds'
    },
    {
        id: 6,
        pos:{top: height / 2.1, left: width / 1.7},
        type: typesRoadBtns.locked,
        price: 6,
        rewardType: 'coins'
    },
    {
        id: 7,
        pos:{top: height / 2.7, left: width / 1.25},
        type: typesRoadBtns.locked,
        price: 8,
        rewardType: 'coins'
    },
    {
        id: 8,
        pos:{top: height / 4, left: width / 1.8},
        type: typesRoadBtns.locked,
        price: 1,
        rewardType: 'diamonds'
    },
    {
        id: 9,
        pos:{top: height / 6, left: width / 5},
        type: typesRoadBtns.locked,
        price: 3,
        rewardType: 'diamonds'
    },
]