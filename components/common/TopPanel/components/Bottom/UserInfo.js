import React from "react";
import styled from "styled-components";
import Text from "../../../Text/Text";
import Experience from "../Top/Experience";
import Avatar from "../../../Avatars/Avatar";
import {useDispatch} from "react-redux";
import {setAvatarPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import SlideScreen from "../../../AnimationScreens/SlideScreen";
import {useNavigation} from "@react-navigation/native";
import {store} from "../../../../redux/redux-store";
import {setActiveTabApp} from "../../../../redux/reducers/Websocket/WebsocketReducer";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import {Platform, View} from "react-native";

const UserInfo = (props) => {

    const {avatarId, user, experience} = props.userData
    const navigation = useNavigation()

    const hendelAvatar = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        navigation.navigate('UserInfoScreen')
        store.dispatch(setActiveTabApp('UserInfoScreen'))
    }

    return (
        <SlideScreen left={true}>
            <UserInfoContainer>
                <AvatarContainer>
                    <Avatar width={60} height={60} avatarFrame={true} avatarId={avatarId} hendelAvatar={hendelAvatar}/>
                </AvatarContainer>

                <AvatarIfoContainer>
                    {/*<UserName setShadow={true} numberOfLines={Platform.OS === 'android' ? 2 : 1} ellipsizeMode='middle' large heavy>{user ? user.username : ''}</UserName>*/}
                    <Experience experience={experience}/>
                </AvatarIfoContainer>
            </UserInfoContainer>
        </SlideScreen>

    )
}

const UserInfoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 5px;
  border-radius: 10px;
  width: 80px;
  height: 80px;
  background-color: rgb(1,1,70);
`
const AvatarIfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 55%;
  margin-left: 20px;
`
const AvatarContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  width: 50px;
  height: 50px;
`

const UserName = styled(Text)`
`

export default UserInfo