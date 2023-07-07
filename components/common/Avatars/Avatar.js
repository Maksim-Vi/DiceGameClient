import React from 'react';
import {getAvatarById} from "../TopPanel/utils";
import styled from "styled-components";
import Sounds, {soundsType} from "../../utils/Sounds";
import frame from "../../../assets/avatars/normal.png";
import { useSelector } from 'react-redux';
import { selectActiveItems, selectMyUser } from '../../redux/reducers/players/PlayersReducer';
import images from '../../../assets/dynamicLoadImage';

const Avatar = (props) => {

  const myUser = useSelector(selectMyUser)
  const activeItems = useSelector(selectActiveItems)

  const onHandlerAvatar = () =>{
    if(props.hendelAvatar){
        Sounds.loadAndPlayFile(soundsType.click2)
        props.hendelAvatar()
    }
  }

  const getAvatarFrame = () =>{
    if(myUser && props.user && myUser.username === props.user.username){
      const img =  images.frames[+activeItems.frame]

      if(img) return img
    } else if(myUser && props.user && myUser.username !== props.user.username){
      if(props.user.activeItems){
        const img =  images.frames[+props.user.activeItems.frame]

        if(img) return img
      }
    }

    return frame
  }

  const AvatarFrame = () =>{
      return <Frame>
          <AvatarFrameContainer source={getAvatarFrame()} resizeMode="contain"></AvatarFrameContainer>
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