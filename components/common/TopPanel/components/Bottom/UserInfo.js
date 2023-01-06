import React from "react";
import styled from "styled-components";
import Text from "../../../Text/Text";
import Experience from "../Top/Experience";
import Avatar from "../../../Avatars/Avatar";
import { useDispatch } from "react-redux";
import { setAvatarPopup } from "../../../../redux/reducers/popups/PopupsReducer";
import SlideScreen from "../../../AnimationScreens/SlideScreen";

const UserInfo = (props) =>{
  
  const {avatarId, user, experience} = props.userData

  const dispatch = useDispatch()

  const hendelAvatar = () =>{
    dispatch(setAvatarPopup({visible: true, data: null}))
  }

  return (
      <SlideScreen left={true}>
          <UserInfoContainer>
              <AvatarContainer>
                  <Avatar width={50} height={50} avatarId={avatarId} hendelAvatar={hendelAvatar}/>
              </AvatarContainer>


              <AvatarIfoContainer>
                  <UserName numberOfLines={2} madium heavy>{user ? user.username : ''}</UserName>
                  <Experience experience={experience}/>
              </AvatarIfoContainer>
          </UserInfoContainer>
      </SlideScreen>

  )
}

const UserInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin-left: 5px;
  border-radius: 10px;
  width: 130px;
  height: 60px;
  background-color: rgba(13, 64, 194, 0.88);
`
const AvatarIfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50%;
  margin-left: 5px;
`
const AvatarContainer = styled.View`
  width: 50px;
  height: 50px;
`

const UserName = styled(Text)`
`

export default UserInfo