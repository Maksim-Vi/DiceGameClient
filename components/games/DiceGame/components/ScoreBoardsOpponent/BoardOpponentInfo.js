import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components';
import Avatar from '../../../../common/Avatars/Avatar';
import Text from '../../../../common/Text/Text';

const BoardOpponentInfo = (props) => {
        
  const {width,height} = useWindowDimensions()
  console.log('ANSWER', props.countScores);
  return (
      <BoardAvatarContainer width={width} height={height}>
          <Name large blod color={'#000'} center>{props.opponent.username || ''}</Name>
          <Avatar avatarId={props.opponent.avatar}/>
          <CountContainer width={width}>
            <CountScores width={width} large blod color={'#fff'}>{props.countScores ? props.countScores.scoresOpponent : 0}</CountScores>
          </CountContainer>
      </BoardAvatarContainer>
  )
};

const BoardAvatarContainer = styled.View`
  position: absolute;
  right: -12%;
  ${(props)=>{
       if(props.width <= 400){
        return `
          bottom: 0;
          width: 50px;
          height: 50px;
        `
      } else if(props.width > 400 && props.width <= 550){
        return `
          bottom: -10%;
          width: 70px;
          height: 70px;
        `
      } else if(props.width > 550){
        return `
          width: 100px;
          height: 100px;
        `
      }
  }}
`

const CountScores = styled(Text)`
  text-align: center;
`
const CountContainer = styled.View`
  background-color: #354d57;
  border-radius: 5px;
  border: 2px solid #d6dbdd;
  ${(props)=>{
      if(props.width <= 400){
        return `
          margin-top: 10px;
          width: 50px;
        `
      } else if(props.width > 400 && props.width <= 550){
        return `
          margin-top: 20px;
          width: 70px;
        `
      } else if(props.width > 550){
        return `
          margin-top: 30px;
          width: 100px;
        `
      }
  }}
`

const Name = styled(Text)`
`

export default BoardOpponentInfo