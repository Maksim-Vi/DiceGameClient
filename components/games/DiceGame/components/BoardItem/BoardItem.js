import React, { useEffect } from 'react'
import styled from 'styled-components'
import {Animated, Dimensions, Easing} from "react-native";
import imagesGameSquares from "../../../../../assets/dynamicLoadGameSquares";
import imagesGameDices from "../../../../../assets/dynamicLoadGameDices";
import animOne from "../../../../../assets/animation/anim-light-one.png";
import animTwo from "../../../../../assets/animation/anim-purpure-two.png";

const BoardItem = (props) => {

  const width = Dimensions.get('window').width;

  const spinValue = React.useRef(new Animated.Value(0))
  const opacityValue = React.useRef(new Animated.Value(0))

  const [showAnim, setShowAnim] = React.useState(false)

  const rotateData = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const opacityData = opacityValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0,1],
  })

  const hendlerClick = () =>{
    if(props.selectBoardItem && props.item === 0){
      props.selectBoardItem(props.index)
    }
  }

  const getSquare = () =>{
    return imagesGameSquares[props.activeItems ? props.activeItems.square : 13]
  }

  const getDiceNumber = () =>{
    let diceImg = ''

    if(props.item > 0) {
      diceImg = imagesGameDices[props.activeItems ? props.activeItems.dice : 14][+props.item]
    }

    return diceImg
  }

  const getSelectedSquares = () =>{
    if(props.item > 0){
      if(props.winPoints){
        if(props.item === +props.winPoints.number && +props.winPoints.count === 2){
          getAnim()
          return animOne
        } else if(props.item === +props.winPoints.number && +props.winPoints.count === 3){
          getAnim()
          return animTwo
        }

        stopAnimation()
        return null
      }
    } 

    stopAnimation()
    return ''
  }

  const getAnim = () =>{
    if(!showAnim){
      spinValue.current.setValue(0);
      opacityValue.current.setValue(1);

      Animated.timing(spinValue.current, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => getAnim());

      setShowAnim(true)
    }
  }

  const stopAnimation = () =>{
    if(showAnim){
      opacityValue.current.setValue(0)
      setShowAnim(false)
    }
  }

  return (
      <ItemContainer {...props} width={width} onPress={hendlerClick} enabled={true} activeOpacity={.8}>
        <SquaresImage source={getSquare()} resizeMode={'stretch'}/>
        {getDiceNumber() !== "" &&
            <DiceImage  width={width} source={getDiceNumber()}/>
        }
        <SquaresAnim style={{
          opacity: opacityData,
          transform: [{rotate: rotateData}]
        }} source={getSelectedSquares()} resizeMode={'stretch'}/>
      </ItemContainer>
  )
}

const ItemContainer = styled.TouchableOpacity`
  position: relative;
  flex-grow: 1;
  width: 25%;
  height: auto;
  align-items: center;
  justify-content: center;
  margin: 5px;
`

const SquaresImage = styled.Image`
  width: 65px;
  height: 65px;
  align-items: center;
  justify-content: center;
`

const SquaresAnim = styled(Animated.Image)`
  position: absolute;
  top: -18px;
  width: 80px;
  height: 80px;
  margin: auto;
`

const DiceImage = styled.Image`
  position: absolute;
  top: -2px;
  flex-grow: 1;
  width: 45px;
  height: 45px;
  z-index: 1;
`


export default BoardItem


// const getSelectedSquaresOld = () =>{
//   if(props.item > 0){
//     if(props.winPoints){
//       if(props.item === +props.winPoints.number && +props.winPoints.count === 2){
//         return {borderColor: "#60ac31", borderWidth: 3}
//       } else if(props.item === +props.winPoints.number && +props.winPoints.count === 3){
//          return {borderColor: "#4b0082", borderWidth: 3}
//       }
//     }
//      return {borderColor: "#deb887", borderWidth: 3}
//   }
// }