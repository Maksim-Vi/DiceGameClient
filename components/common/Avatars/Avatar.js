import React from 'react';
import {getAvatarById} from "../TopPanel/utils";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { setAvatarPopup } from '../../redux/reducers/popups/PopupsReducer';

const Avatar = (props) => {

  const dispatch = useDispatch()

  const hendelAvatar = () =>{
    console.log('on press');
    dispatch(setAvatarPopup({visible: true, data: null}))
  }

    return (
      <UserInfoBtn onPress={hendelAvatar}>
        <AvatarContainer>
           <AvatarImg source={getAvatarById(props.avatarId)} resizeMode={ 'stretch'} />
        </AvatarContainer>
      </UserInfoBtn>
    )
}


const AvatarContainer = styled.View`
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  width: 45%;
`
const AvatarImg = styled.Image`
  width: 100%;
  height: 100%;
`
const UserInfoBtn = styled.TouchableWithoutFeedback`
 
`

export default Avatar;