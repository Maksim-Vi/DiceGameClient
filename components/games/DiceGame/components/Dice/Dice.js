import {Animated, Dimensions, Easing} from 'react-native'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import imagesGameDices from "../../../../../assets/dynamicLoadGameDices";
import { setTimingAnimated } from '../../../../utils/Animation';

const Dice = (props) => {
 
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const width = Dimensions.get('window').width;

  const getDiceNumber = () =>{
    let diceImg = ''

    if(props.diceNumber > 0) {
      diceImg = imagesGameDices[props.activeItems ? props.activeItems.dice : 14][+props.diceNumber]
    }

    return diceImg
  }

  const throwAnim = () =>{
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
    if(props.width < 350){
      return 'width: 50px;'
    } else {
      return 'width: 70px; '
    }
  }}
  ${props=>{
    if(props.width < 350){
      return 'height: 50px;'
    } else {
      return 'height: 70px;'
    }
  }}
`

export default Dice

// display: ${props=>{
//     if(Platform.OS === 'ios') {
//       if (props.isShow) {
//         return 'block;'
//       } else {
//   return 'none;'
// }
// } else {
//   return 'block;'
// }
// }};