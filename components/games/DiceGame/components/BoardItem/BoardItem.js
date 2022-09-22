import React from 'react'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'
import {Dimensions, Platform} from "react-native";
import imagesGameSquares from "../../../../../assets/dynamicLoadGameSquares";
import imagesGameDices from "../../../../../assets/dynamicLoadGameDices";

const BoardItem = (props) => {

  const width = Dimensions.get('window').width;

  const hendlerClick = () =>{
    if(props.selectBoardItem){
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
          return {borderColor: "#60ac31", borderWidth: 3}
        } else if(props.item === +props.winPoints.number && +props.winPoints.count === 3){
          return {borderColor: "#4b0082", borderWidth: 3}
        }
      }
      return {borderColor: "#deb887", borderWidth: 3}
    }
  }

  // return (
  //   <ItemContainer {...props} width={width} onPress={hendlerClick} enabled={true} activeOpacity={.8}>
  //     <Text small blod>{props.item > 0 ? props.item : ''}</Text>
  //   </ItemContainer>
  // )

  return (
      <ItemContainer {...props} width={width} onPress={hendlerClick} enabled={true} activeOpacity={.8}>
        <SquaresImage  style={getSelectedSquares()} source={getSquare()}/>
        {getDiceNumber() !== "" &&
            <DiceImage  width={width} source={getDiceNumber()}/>
        }
      </ItemContainer>
  )
}

// const ItemContainer = styled.TouchableOpacity`
//   flex-grow: 1;
//   width: 22%;
//   height: 50px;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   border: ${props => props.item > 0 ? '1px solid #dbdbdb' : '1px solid #dbdbdb96'} ;
//
//   ${props =>{
//     if(props.item > 0){
//         if(props.winPoints){
//           if(props.item === +props.winPoints.number && +props.winPoints.count === 2){
//             return 'background-color: #60ac31'
//           } else if(props.item === +props.winPoints.number && +props.winPoints.count === 3){
//             return 'background-color: #4b0082'
//           }
//         }
//         return 'background-color: #deb887'
//     } else {
//       return 'background-color: #deb88745'
//     }
//   }
//   };
//   margin: 0px 10px 10px 10px;
// `
const ItemContainer = styled.TouchableOpacity`
  position: relative;
  flex-grow: 1;
  width: 22%;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 10px 10px;
`

const SquaresImage = styled.Image`
  flex-grow: 1;
  width: 65px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 10px 10px;
  resizeMode: 'stretch';
  
  ${props =>{
    if(props.item > 0){
        if(props.winPoints){
          if(props.item === +props.winPoints.number && +props.winPoints.count === 2){
            return `border: 2px solid #60ac31; border-radius: 10px;`
          } else if(props.item === +props.winPoints.number && +props.winPoints.count === 3){
            return 'border: 2px solid #4b0082; border-radius: 10px;'
          }
        }
        return 'border: 2px solid #deb887; border-radius: 10px;'
    } else {
      return 'border: 2px solid #deb88745; border-radius: 10px;'
    }
  }};
`

const DiceImage = styled.Image`
  position: absolute;
  top: -2px;
  flex-grow: 1;
  width: 45px;
  height: 45px;
`


export default BoardItem