import images from "../../assets/dynamicLoadImage";
import {selectMyUser} from "../redux/reducers/players/PlayersReducer";
import {store} from "../redux/redux-store";
import {setActiveTabApp} from "../redux/reducers/Websocket/WebsocketReducer";
import DeviceInfo from "react-native-device-info";
import {NativeModules, Platform} from "react-native";
import GameModel from "../games/GameModel/GameModel";
import moment from 'moment'

export const isProduction = () => {
    //return process.env.APP_TYPE === 'production'
    return true
}

export const transitionState = (tab, data = {}) => {
    if (window.navigation) {
        window.navigation.navigate(tab, data)
        store.dispatch(setActiveTabApp(tab))
    }
}

export const getDeviceLocation = () => {
    const deviceLanguage =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier;

    switch (deviceLanguage) {
        case 'EN':
        case 'en':
        case 'en-US':
            return 'EN'
        case 'ua':
        case 'UA':
        case 'uk':
        case 'uk-US':
            return 'UA'
        default:
            return 'EN'
    }
}

export const getIosModel = () => {
    if (Platform.OS !== 'ios') return 0

    const model = DeviceInfo.getModel()

    const iosModels = [
        'iPhone XS', 'iPhone XR', 'iPhone XS Max',
        'iPhone 10', 'iPhone 10 Pro', 'iPhone 10 Pro Max',
        'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
        'iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
        'iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
        'iPhone 14', 'iPhone 14 Plus',
        //'iPhone 14 Pro','iPhone 14 Pro Max'
    ]

    if (model && (model.includes('iPhone 14 Pro') || model.includes('iPhone 14 Pro Max'))) {
        return 14
    }

    if (model) {
        const isIos = iosModels.find(modelIos => modelIos.toLowerCase() === model.toLowerCase())
        return !!isIos ? 10 : 9
    }

    return 0
}

export const getCollectionDiceImg = (item, id) => {
    try {
        if (+id) {
            if(images.dices[+id]){
                return images.dices[+id]
            } else if (item.image && item.image !== '') {
                return {uri: item.image}
            }

            return images.dices['default']
        }
    } catch (e) {
        console.error('cannot loaded dice by name, set default')
        return images.dices['default']
    }
}

export const getCollectionSquareImg = (item, id) => {
    try {
        if (+id) {
            if(images.squares[+id]){
                return images.squares[+id]
            } else if (item.image && item.image !== '') {
                return {uri: item.image}
            }

            return images.squares['default']
        }

    } catch (e) {
        console.error('cannot loaded dice by name, set default')
        return images.squares['default']
    }
}

export const getResultScreenData = () => {
    const myUser = selectMyUser(store.getState())
    return {
        gameId: 13234241,
        players: [
            {
                id: myUser.id,
                username: myUser.username,
                avatar: myUser.avatar,
                side: 0,
                activeItems: {square: 1004, dice: 2},
                inGame: true
            },
            {id: 66, username: 'Tetris', avatar: 5, side: 1, activeItems: {square: 1008, dice: 5}, inGame: true}
        ],
        userResultItems: {
            scores: 80,
            coins: 3,
            crystals: 1,
        },
        opponentResultItems: {
            scores: 50,
            coins: 0,
            crystals: 0,
        },
        userWin: true,
        opponentWin: false
    }
}

export const getStartGameData = () => {
    const myUser = selectMyUser(store.getState())
    const data = {
        isStarted: true,
        gameSettings: {
            gameId: "70aa11c2-1e15-4a0f-892e-c85585e6c47a",
            isStarted: true,
            maxPlayers: 2,
            countPlayers: 2,
            bot: true,
            players: [
                {
                    id: 123456789,
                    username: "TEST user",
                    avatar: 3,
                    activeItems: {square: 1008, dice: 5},
                    inGame: true,
                    side: 1
                },
                {
                    id: myUser.id,
                    username: myUser.username,
                    avatar: "3",
                    side: 2,
                    activeItems: {square: 1012, dice: 7},
                    inGame: true
                }
            ],
            table: {row: 3, column: 3},
            gameTime: 360
        },
        gameData: {
            player1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            player2: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    }

    GameModel.setGameData(data.gameSettings, data)
    GameModel.setGameStarted(true, true, 1000)

    return data
}

export const getCurrentData = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return dd + '.' + mm + '.' + yyyy;
}

export const calcLastTimeOnline = (time) => {
    if (+time > 0 && moment.unix(+time / 1000).isValid()) {
        return moment(moment.unix(+time / 1000)).fromNow()
    }

    return null
}

export const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

export const getRandomNumber = (min, max, negative = false) =>{
    const number = Math.random() * (max - min) + max
    if(!negative){
        return number
    }

    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    return plusOrMinus === 1 ? number : -number
}

export const getRadiusPosition = (count, r, cx, cy) =>{
    const sectors = [];
    let startAngle = -90;
    let endAngle = 0;
    let maxCard = 6;

    for (let i=0; i<count; i++)  {
        if (i<=maxCard-1){
            const angle = 360/maxCard;
            endAngle += angle;
            const rad = Math.PI / 180;
            const x = cx + r * Math.cos(startAngle * rad);
            const y = cy + r * Math.sin(startAngle * rad);
            startAngle += angle;
            sectors.push({x, y});
        } else {
            const angle = 360/(count-maxCard);
            endAngle += angle;
            const rad = Math.PI / 180;
            const x = cx + r * 2 * Math.cos(startAngle * rad);
            const y = cy + r * 2 * Math.sin(startAngle * rad);
            startAngle += angle;
            sectors.push({x, y});
        }
    }
    return sectors;
}