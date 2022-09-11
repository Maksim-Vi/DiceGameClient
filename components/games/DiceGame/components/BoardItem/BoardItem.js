import React from 'react'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'
import {Dimensions, Platform} from "react-native";

const BoardItem = (props) => {

  const width = Dimensions.get('window').width;

  const hendlerClick = () =>{
    if(props.selectBoardItem){
      props.selectBoardItem(props.index)
    }
  }

  return (
    <ItemContainer {...props} width={width} onPress={hendlerClick} enabled={true} activeOpacity={.8}>
      <Text small blod>{props.item > 0 ? props.item : ''}</Text>
    </ItemContainer>
  )
}

const ItemContainer = styled.TouchableOpacity`
  flex-grow: 1;
  width: 22%;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: ${props => props.item > 0 ? '1px solid #dbdbdb' : '1px solid #dbdbdb96'} ;
  
  ${props =>{
    if(props.item > 0){
        if(props.winPoints){
          if(props.item === +props.winPoints.number && +props.winPoints.count === 2){
            return 'background-color: #60ac31'
          } else if(props.item === +props.winPoints.number && +props.winPoints.count === 3){
            return 'background-color: #4b0082'
          }
        }
        return 'background-color: #deb887'
    } else {
      return 'background-color: #deb88745'
    }
  }
  };
  margin: 0px 10px 10px 10px;
`
export default BoardItem

/*
${props=>{
    if(props.width < 400) {
      return 'width: 50px'
    } else {
      return 'width: 60px'
    }
  }}
  ${props=>{
    if(props.width < 400) {
      return 'height: 50px'
    } else {
      return 'height: 60px'
    }
  }}
*/