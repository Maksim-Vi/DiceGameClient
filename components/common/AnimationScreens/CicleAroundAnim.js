import React, {useEffect} from 'react';
import {Animated, Easing} from "react-native";
import {setTimingAnimated} from "../../utils/Animation";

const CircleAroundAnim = (props) => {

    const spinValue = React.useRef(new Animated.Value(0)).current;
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const startAnim = () =>{
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(spinValue, 1, 15000, Easing.linear, false),
            ])
        ).start();
    }

    useEffect(() => {
        startAnim()
        return () => {
            spinValue.stopAnimation()
        };
    },[]);

    return (
        <Animated.Image style={{
                            width: props.width ? props.width : 100,
                            height: props.height ? props.height : 100,
                            transform: [{rotate: spin}]
                        }}
                        source={props.img}
                        resizeMode={'contain'}/>
    )
}

export default CircleAroundAnim;