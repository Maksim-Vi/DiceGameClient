import React from 'react';
import {getAvatarById} from "../TopPanel/utils";
import styled from "styled-components";

const Avatar = (props) => {

  const onHandlerAvatar = () =>{
    if(props.hendelAvatar){
      props.hendelAvatar()
    }
  }

  return (
    <UserInfoBtn onPress={onHandlerAvatar}>
      <AvatarContainer {...props}>
          <AvatarImg source={getAvatarById(+props.avatarId)} resizeMode={ 'stretch'} />
      </AvatarContainer>
    </UserInfoBtn>
  )
}


const AvatarContainer = styled.View`
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  ${props=>props.width ? `${props.width}px` : '50px'}
  ${props=>props.height ? `${props.height}px` : '50px'}
`
const AvatarImg = styled.Image`
  width: 100%;
  height: 100%;
`
const UserInfoBtn = styled.TouchableWithoutFeedback`
 
`

export default Avatar;