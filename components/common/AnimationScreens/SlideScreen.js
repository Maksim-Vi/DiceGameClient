import React from 'react'
import {useFocusEffect} from "@react-navigation/native";
import {Animated, Easing} from "react-native";

const SlideScreen = (props) => {

    const slideAnim = React.useRef(new Animated.Value(0)).current;

    useFocusEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
        return () => {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        };
    });

    return (
        <Animated.View // Special animatable View
            style={{
                flex: 1,
                transform:[{
                    translateX: slideAnim.interpolate({
                        inputRange: [0,1],
                        outputRange: [props.left ? -600 : 600,0],
                    })
                }]
            }}>
            {props.children}
        </Animated.View>
    );
};

export default SlideScreen