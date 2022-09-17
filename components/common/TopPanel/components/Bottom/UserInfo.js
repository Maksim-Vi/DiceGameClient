import React from "react";
import styled from "styled-components";
import {getAvatarById} from "../../utils";
import Text from "../../../Text/Text";
import Experience from "../Top/Experience";

const UserInfo = (props) =>{
    const {avatarId, user, experience} = props.userData
    return (
        <UserInfoContainer>
            <AvatarContainer>
                <UserInfoBtn>
                    <AvatarImg source={getAvatarById(avatarId)} />
                </UserInfoBtn>
            </AvatarContainer>

            <AvatarIfoContainer>
                <UserName madium heavy>{user ? user.username : ''}</UserName>
                <Experience experience={experience}/>
            </AvatarIfoContainer>
        </UserInfoContainer>
    )
}

const UserInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin-left: 10px;
  border-radius: 10px;
  width: 130px;
  height: 60px;
  background-color: rgba(13, 64, 194, 0.88);
`

const AvatarContainer = styled.View`
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  width: 45%;
`
const AvatarImg = styled.Image`
  width: 100%;
  height: 100%;
  resizeMode: 'stretch'
`

const AvatarIfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-left: 5px;
`
const UserInfoBtn = styled.TouchableWithoutFeedback`
 
`

const UserName = styled(Text)`
`

export default UserInfo