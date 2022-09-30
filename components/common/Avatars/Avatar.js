import React from 'react';
import {getAvatarById} from "../TopPanel/utils";
import styled from "styled-components";

const Avatar = (props) => {
    return (
        <AvatarContainer>
            <UserInfoBtn>
                <AvatarImg source={getAvatarById(props.avatarId)} resizeMode={ 'stretch'} />
            </UserInfoBtn>
        </AvatarContainer>
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