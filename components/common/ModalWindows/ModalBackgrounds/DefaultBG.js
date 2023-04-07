import React from 'react'
import styled from 'styled-components'
import bgTitle from "../../../../assets/modal/popup_bg.png";
import {Animated, Easing} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {delay} from "../../../utils/utils";

const DefaultBG = (props) =>{

    const slideAnim = React.useRef(new Animated.Value(0)).current;

    useFocusEffect(() => {
        delay(100).then(()=>{
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        })
    });

    return (
        <Wrapper {...props} style={{
            transform:[{
                scale: slideAnim.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, 1],
                })
            }]
        }}>
            <ContainerBG {...props} source={bgTitle} resizeMode={'stretch'}>
                {props.children}
            </ContainerBG>
        </Wrapper>
    )
}

const ContainerBG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>  props.width ? `${Math.floor(props.width)}px`  : '100%'};
  height: ${(props) =>  props.height ? `${Math.floor(props.height)}px` : '50%'};
`

const Wrapper = styled(Animated.View)`
    margin: ${(props) =>  props.margin ? `${props.margin}px`  : '10px'};
`

export default DefaultBG