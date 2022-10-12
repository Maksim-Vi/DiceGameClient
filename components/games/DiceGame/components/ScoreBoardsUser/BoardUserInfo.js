import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components';
import Avatar from '../../../../common/Avatars/Avatar';
import Text from '../../../../common/Text/Text';

const BoardUserInfo = (props) => {
     
  const {width} = useWindowDimensions()

  console.log('ANSWER', width);

  return (
      <BoardAvatarContainer width={width}>
          <CountScores width={width} large blod color={'#000'}>{props.countScores ? props.countScores.scoresUser : 0}</CountScores>
          <Avatar avatarId={props.user.avatar}/>
          <Name large blod color={'#000'} center>{props.user.username || ''}</Name>
      </BoardAvatarContainer>
  )
};

const BoardAvatarContainer = styled.View`
  position: absolute;
  left: -12%;
  ${(props)=>{
      if(props.width <= 400){
        return `
          top: -20%;
          width: 50px;
          height: 50px;
        `
      } else if(props.width > 400 && props.width <= 550){
        return `
          top: -35%;
          width: 70px;
          height: 70px;
        `
      } else if(props.width > 550){
        return `
          top: -40%;
          width: 100px;
          height: 100px;
        `
      }
  }}
`

const CountScores = styled(Text)`
  text-align: center;
  ${(props)=>{
      if(props.width <= 400){
        return `
          margin-bottom: 10px;
        `
      } else if(props.width > 400 && props.width <= 550){
        return `
          margin-bottom: 20px;
        `
      } else if(props.width > 550){
        return `
          margin-bottom: 30px;
        `
      }
  }}
`

const Name = styled(Text)`
`

export default BoardUserInfo