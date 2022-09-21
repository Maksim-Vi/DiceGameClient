import {Dimensions} from 'react-native'
import React from 'react'
import styled from 'styled-components'
import imagesGameDices from "../../../../../assets/dynamicLoadGameDices";

const Dice = (props) => {

  const width = Dimensions.get('window').width;

  const getDiceNumber = () =>{
    let diceImg = ''

    switch (props.diceNumber) {
      case 0: {
        diceImg = ''
        break
      }
      case 1: {
        diceImg = imagesGameDices[props.activeItems.dice || 1][`${props.diceNumber}`]
        break
      }
      case 2:  {
        diceImg = imagesGameDices[props.activeItems.dice || 1][`${props.diceNumber}`]
        break
      }
      case 3:  {
        diceImg = imagesGameDices[props.activeItems.dice || 1][`${props.diceNumber}`]
        break
      }
      case 4:  {
        diceImg = imagesGameDices[props.activeItems.dice || 1][`${props.diceNumber}`]
        break
      }
      case 5:  {
        diceImg = imagesGameDices[props.activeItems.dice || 1][`${props.diceNumber}`]
        break
      }
      case 6:  {
        diceImg = imagesGameDices[props.activeItems.dice || 1][`${props.diceNumber}`]
        break
      }
      default:  {
        diceImg = ''
        break
      }
    }

    return diceImg
  }

  return getDiceNumber() !== "" && <DiceImage width={width} isShow={props.diceNumber ? true : false} source={getDiceNumber()} />
}

const DiceImage = styled.Image`
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