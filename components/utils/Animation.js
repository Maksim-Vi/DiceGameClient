import { Animated, Easing } from "react-native";

export const setTimingAnimated = (originalValue, newValue, duration, easing = Easing.linear, useNativeDriver = false) => {
    return Animated.timing(originalValue, {
        toValue: newValue,
        duration,
        easing: easing,
        useNativeDriver: useNativeDriver,
    });
}