import React, {memo, useEffect, useState} from 'react';
import {Animated, Dimensions, Easing} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";
import imagesGameDices from "../../../../../assets/dynamicLoadGameDices";
import styled from "styled-components";

const Dice = memo(function Dice(props) {

    const {width} = Dimensions.get('window');
    const animatedValue = React.useRef(new Animated.Value(1))
    const scaleData = animatedValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })
    const [dicePrevNumber, setDicePrevNumber] = useState(null)

    const getDiceNumber = () => {
        let diceImg = ''

        if(props.item > 0) {
            let diceUrl = ''
            const activeDice = imagesGameDices[props.activeItems ? props.activeItems.dice : 1]

            if(activeDice){
                diceUrl = activeDice[+props.item]
            } else {
                diceUrl = imagesGameDices['default'][+props.item]
            }

            diceImg = diceUrl
        }

        return diceImg ? diceImg : ''
    }

    const setDiceInPlaceAnim = () => {
        Animated.sequence([
            setTimingAnimated(animatedValue.current, 1.2, 150, Easing.ease),
            setTimingAnimated(animatedValue.current, 1, 50, Easing.ease),
        ]).start();
    }

    const stopAnimation = () => {
        animatedValue.current.setValue(0)
    }

    useEffect(()=>{
        if(props.item && props.item > 0 && props.item !== dicePrevNumber){
            setDiceInPlaceAnim();
            setDicePrevNumber(props.item)
        } else {
            setDicePrevNumber(0)
        }

        return ()=>{
            stopAnimation();
        }
    },[props.item])

    return (
        <React.Fragment>
            {dicePrevNumber > 0 &&
                <DiceImage width={width}
                           style={{transform: [{scale: scaleData}]}}
                           source={getDiceNumber()}
                           resizeMode={'stretch'}/>
            }
        </React.Fragment>

    )
})

const DiceImage = styled(Animated.Image)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  ${(props)=> {
    if(props.width > 420){
        return `
        width: ${65 / 1.5}px
        height: ${65 / 1.5}px
      `;
    }  else if(props.width > 380 && props.width < 420){
        return `
        width: ${55 / 1.5}px;
        height: ${55 / 1.5}px;
      `;
    } else if(props.width < 380){
        return `
        width: ${45 / 1.5}px;
        height: ${45 / 1.5}px;
      `;
    }
}};
  z-index: 1;
`

export default Dice;