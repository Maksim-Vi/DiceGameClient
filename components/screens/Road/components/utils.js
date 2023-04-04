import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const rewardType = {
    coins: 'coins',
    diamonds: 'crystals',
}

export const roadMap = [
    {
        id: 0,
        pos:{top: height / 1.22, left: width / 4},
        //pos:{top: height - 110, left: width / 4},
    },
    {
        id: 1,
        pos:{top: height / 1.2, left: width / 2},
        //pos:{top: height - 90, left: width / 2},
    },
    {
        id: 2,
        pos:{top: height / 1.3, left: width / 1.3},
        //pos:{top: height - 130, left: width / 1.3},
    },
    {
        id: 3,
        pos:{top: height / 1.52, left: width / 1.8},
        //pos:{top: height - 210, left: width / 1.8},
    },
    {
        id: 4,
        pos:{top: height / 1.65, left: width / 6.5},
        //pos:{top: height - 240, left: width / 5},
    },
    {
        id: 5,
        pos:{top: height / 2, left: width / 3},
        //pos:{top: height - 325, left: width / 2.55},
    },
    {
        id: 6,
        pos:{top: height / 2.1, left: width / 1.7},
        //pos:{top: height - 340, left: width / 1.55},
    },
    {
        id: 7,
        pos:{top: height / 2.8, left: width / 1.25},
        //pos:{top: height - 450, left: width / 1.25},
    },
    {
        id: 8,
        pos:{top: height / 4.2, left: width / 1.7},
        //pos:{top: height - 490, left: width / 1.8},
    },
    {
        id: 9,
        pos:{top: height / 6.3, left: width / 5},
        //pos:{top: height - 540, left: width / 5},
    },
]
