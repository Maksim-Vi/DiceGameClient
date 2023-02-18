import {Dimensions} from "react-native";
import {
    Extrapolate,
    interpolate,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH / 5;


export const scaleAnimation = (udv, index) => {
    'worklet';
    return udv.value === null
        ? 0
        : interpolate(
            udv.value,
            [
                (index - 2) * ITEM_WIDTH,
                (index - 1) * ITEM_WIDTH,
                index * ITEM_WIDTH,
                (index + 1) * ITEM_WIDTH,
                (index + 2) * ITEM_WIDTH,
            ],
            [0.5, 0.7, 1, 0.7, 0.5],
            Extrapolate.CLAMP,
        );
};

export const opacityAnimation = (udv, index) => {
    'worklet';
    return udv.value === null
        ? 0
        : interpolate(
            udv.value,
            [
                (index - 2) * ITEM_WIDTH,
                (index - 1) * ITEM_WIDTH,
                index * ITEM_WIDTH,
                (index + 1) * ITEM_WIDTH,
                (index + 2) * ITEM_WIDTH,
            ],
            [0, 0.5, 0.8, 1, 0.8, 0.5, 0],
            Extrapolate.CLAMP,
        );
};