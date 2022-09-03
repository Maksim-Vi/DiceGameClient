import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import dice1 from '../../../../../assets/game/dice_1.png'
import dice2 from '../../../../../assets/game/dice_2.png'
import dice3 from '../../../../../assets/game/dice_3.png'
import dice4 from '../../../../../assets/game/dice_4.png'
import dice5 from '../../../../../assets/game/dice_5.png'
import dice6 from '../../../../../assets/game/dice_6.png'

const Dice = (props) => {

  const getDiceNumber = () =>{
      switch (props.diceNumber) {
        case 1: return dice1
        case 2: return dice2
        case 3: return dice3
        case 4: return dice4
        case 5: return dice5
        case 6: return dice6
        default: break;
      }
  }

  return <DiceImage source={getDiceNumber()} />
}

const DiceImage = styled.Image`

`

export default Dice