import React from 'react';
import {getAvatarById} from "../TopPanel/utils";
import styled from "styled-components";
import Sounds, {soundsType} from "../../utils/Sounds";
import frame from "../../../assets/avatars/normal.png";

const Avatar = (props) => {

  const onHandlerAvatar = () =>{
    if(props.hendelAvatar){
        Sounds.loadAndPlayFile(soundsType.click2)
        props.hendelAvatar()
    }
  }

  const AvatarFrame = () =>{
      return <Frame>
          <AvatarFrameContainer source={frame} resizeMode="contain"></AvatarFrameContainer>
          <AvatarFrameImg avatarId={+props.avatarId} source={getAvatarById(+props.avatarId)} resizeMode={'contain'} />
      </Frame>
  }

  return (
    <UserInfoBtn onPress={onHandlerAvatar}>
      <AvatarContainer {...props}>
          {props.avatarFrame
              ? AvatarFrame()
              : <AvatarImg source={getAvatarById(+props.avatarId)} resizeMode={'contain'} />
          }
      </AvatarContainer>
    </UserInfoBtn>
  )
}


const AvatarContainer = styled.View`
  position: relative;
  //border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  ${props => props.width ? `${props.width}px` : '50px'};
  ${props => props.height ? `${props.height}px` : '50px'};
`

const Frame = styled.View`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  width: 100%;
  height: 100%;
`

const AvatarFrameContainer = styled.ImageBackground`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  width: 100%;
  height: 100%;
`

const AvatarFrameImg = styled.Image`
  position: absolute;
  bottom: 10%;
  left: 10%;
  bottom: ${props => props.avatarId === 1000 ? `25%` : '10%'};
  left: ${props => props.avatarId === 1000 ? `25%` : '10%'};
  width: ${props => props.avatarId === 1000 ? `40px` : '80%'};
  height: ${props => props.avatarId === 1000 ? `40px` : '80%'};
  z-index: 1;
  
`
const AvatarImg = styled.Image`
  width: 100%;
  height: 100%;
  z-index: 1;
`
const UserInfoBtn = styled.TouchableWithoutFeedback`
 
`

export default Avatar;