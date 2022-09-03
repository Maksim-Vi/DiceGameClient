import React from 'react'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'

const BoardItem = (props) => {

  const hendlerClick = () =>{
    if(props.selectBoardItem){
      props.selectBoardItem(props.index)
    }
  }

  return (
    <ItemContainer {...props} onPress={hendlerClick} enabled={true} activeOpacity={.8}>
      <Text large blod>{props.item > 0 ? props.item : ''}</Text>
    </ItemContainer>
  )
}

const ItemContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: ${props => props.item > 0 ? '2px solid #dbdbdb' : '2px solid #dbdbdb96'} ;
  
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