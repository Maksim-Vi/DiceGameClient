import {Animated, Dimensions, Easing} from 'react-native'
import React, {memo, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import imagesGameDices from "../../../assets/dynamicLoadGameDices";
import { setTimingAnimated } from '../../utils/Animation';
import Sounds, {soundsType} from "../../utils/Sounds";

const Dice = (props) => {

    if(!props.diceNumber || typeof props.diceNumber !== 'number' && props.diceNumber <= 0) return null

    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const width = Dimensions.get('window').width;

    const getDiceNumber = useCallback(() =>{
        let diceImg = ''

        if(props.diceNumber > 0) {
            let diceUrl = ''
            const activeDice = imagesGameDices[props.activeItems ? props.activeItems.dice : 1]

            if(activeDice){
                diceUrl = activeDice[+props.diceNumber]
            } else {
                diceUrl = imagesGameDices['default'][+props.diceNumber]
            }

            diceImg = diceUrl
        }

        return diceImg
    },[props.diceNumber])

    const throwAnim = () =>{
        Sounds.loadAndPlayFile(soundsType.throwDice)
        Animated.sequence([
            setTimingAnimated(animatedValue, 1, 200, Easing.ease),
            setTimingAnimated(animatedValue, 1.3, 100, Easing.ease),
            setTimingAnimated(animatedValue, 1, 100, Easing.ease),
        ]).start();
    }

    useEffect(()=>{
        if(props.diceNumber){
            throwAnim()
        } else {
            animatedValue.setValue(0)
        }

        return ()=>{
            animatedValue.setValue(0)
        }
    },[props.diceNumber])

    return getDiceNumber() !== "" &&
        <DiceImage width={width}
                   style={{
                       opacity: animatedValue.interpolate({
                           inputRange: [0, 1],
                           outputRange: [0, 1],
                       }),
                       transform: [
                           {
                               scale: animatedValue.interpolate({
                                   inputRange: [0, 1],
                                   outputRange: [0, 1]
                               })
                           }
                       ]
                   }}
                   isShow={props.diceNumber ? true : false}
                   source={getDiceNumber()}
                   resizeMode={ 'stretch'}/>
}

const DiceImage =  styled(Animated.Image)`
  ${props=>{
    if(props.width < 380){
        return 'width: 50px;'
    } else {
        return 'width: 60px; '
    }
}}
  ${props=>{
    if(props.width < 380){
        return 'height: 50px;'
    } else {
        return 'height: 60px;'
    }
}}
`

export default memo(Dice)
