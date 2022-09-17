import React from "react";
import styled from "styled-components";
import Text from "../../../Text/Text";
import Experience from "../Top/Experience";
import Avatar from "../../../Avatars/Avatar";

const UserInfo = (props) =>{
    const {avatarId, user, experience} = props.userData
    return (
        <UserInfoContainer>
            <Avatar avatarId={avatarId}/>
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
const AvatarIfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-left: 5px;
`
const UserName = styled(Text)`
`

export default UserInfo