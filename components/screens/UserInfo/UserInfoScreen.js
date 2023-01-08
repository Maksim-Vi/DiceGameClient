import React from 'react';
import styled from "styled-components";
import mainBg from "../../../assets/bg/main_bg.jpg";
import BackgroundWrapper from "../../common/BackgroundWrapper/BackgroundWrapper";
import ButtonBack from "../../common/Buttons/Back/ButtonBack";
import Text from "../../common/Text/Text";
import CardInfo from "./components/CardInfo";
import Avatar from "../../common/Avatars/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {setAvatarPopup} from "../../redux/reducers/popups/PopupsReducer";
import Statistic from "./components/Statistic";
import coins from '../../../assets/topPanel/coins.png'
import diamonds from '../../../assets/topPanel/diamond.png'
import flash from '../../../assets/topPanel/flash.png'
import lvl from '../../../assets/topPanel/star_lvl.png'
import CardInfoLvl from "./components/CardInfoLvl";

const UserInfoScreen = (props) => {

    const myUser = useSelector(state => state.players.myUser)
    const dispatch = useDispatch()

    const handelAvatar = () => {
        dispatch(setAvatarPopup({visible: true, data: null}))
    }

    return (
        <BackgroundWrapper gackground={mainBg}>
            <ButtonBack goMainPage={true} />

            <UserInfoContainer>
                <ProfileTitle>
                    <Text setShadow={true} large blod center>Profile</Text>
                </ProfileTitle>

                <ProfileAvatarInfo>
                    <Avatar width={100} height={100} avatarId={myUser.avatar} hendelAvatar={handelAvatar}/>
                    <UserName setShadow={true} large blod center>{myUser.username}</UserName>
                </ProfileAvatarInfo>


                <ProfileContext>
                    <CardInfoLvl icon={lvl} lvl={myUser.experience.lvl} progress={myUser.experience.progress} />
                    <CardInfo icon={coins} price={myUser.coins}/>
                    <CardInfo icon={diamonds} price={myUser.crystals}/>
                    <CardInfo icon={flash} price={myUser.flash}/>
                </ProfileContext>

                <Statistic />
            </UserInfoContainer>
        </BackgroundWrapper>
    )
}

const UserInfoContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 25%;
`

const ProfileTitle = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 70%;
  height: 40px;
  background-color: #2281ce;
  border-radius: 20px;
  border: 3px solid #2b4b8d;
`

const ProfileAvatarInfo = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 10%;
  width: 100%;
`

const UserName = styled(Text)`

`

const ProfileContext = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 10%;
`


export default UserInfoScreen;