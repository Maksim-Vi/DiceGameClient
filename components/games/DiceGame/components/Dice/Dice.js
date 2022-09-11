import {Dimensions, Platform} from 'react-native'
import React from 'react'
import styled from 'styled-components'
import dice1 from '../../../../../assets/game/dice_1.png'
import dice2 from '../../../../../assets/game/dice_2.png'
import dice3 from '../../../../../assets/game/dice_3.png'
import dice4 from '../../../../../assets/game/dice_4.png'
import dice5 from '../../../../../assets/game/dice_5.png'
import dice6 from '../../../../../assets/game/dice_6.png'

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
        diceImg = dice1
        break
      }
      case 2:  {
        diceImg = dice2
        break
      }
      case 3:  {
        diceImg = dice3
        break
      }
      case 4:  {
        diceImg = dice4
        break
      }
      case 5:  {
        diceImg = dice5
        break
      }
      case 6:  {
        diceImg = dice6
        break
      }
      default:  {
        diceImg = ''
        break
      }
    }

    console.log(diceImg)

    return diceImg
  }

  return getDiceNumber() !== "" && <DiceImage width={width} isShow={props.diceNumber ? true : false} source={getDiceNumber()} />
}

const DiceImage = styled.Image`
  ${props=>{
    if(props.width < 350){
      return 'width: 50px;'
    }
  }}
  ${props=>{
    if(props.width < 350){
      return 'height: 50px;'
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