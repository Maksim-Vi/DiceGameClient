import React from 'react';
import styled from "styled-components";
import BackgroundWrapper from "../../common/BackgroundWrapper/BackgroundWrapper";
import ButtonBack from "../../common/Buttons/Back/ButtonBack";
import Text from "../../common/Text/Text";
import CardInfo from "./components/CardInfo";
import Avatar from "../../common/Avatars/Avatar";
import {connect, useDispatch, useSelector} from "react-redux";
import {setAvatarPopup} from "../../redux/reducers/popups/PopupsReducer";
import Statistic from "./components/Statistic";
import coins from '../../../assets/topPanel/coins.png'
import diamonds from '../../../assets/topPanel/diamond.png'
import flash from '../../../assets/topPanel/flash.png'
import lvl from '../../../assets/topPanel/star_lvl.png'
import CardInfoLvl from "./components/CardInfoLvl";
import {Platform} from "react-native";
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {getIosModel} from "../../utils/utils";
import bgTitle from "../../../assets/bg/title_info_text_BG.png";

const UserInfoScreen = (props) => {

    const myUser = useSelector(state => state.players.myUser)
    const dispatch = useDispatch()

    const handelAvatar = () => {
        dispatch(setAvatarPopup({visible: true, data: null}))
    }

    return (
        <BackgroundWrapper>
            <ButtonBack top={'20px'} left={'10px'} goMainPage={true} />

            <UserInfoContainer>
                <ProfileTitle>
                    <TitleBG source={bgTitle} resizeMode={'stretch'}>
                        <Text setShadow={true} large blod center>{props.profile}</Text>
                    </TitleBG>
                </ProfileTitle>

                <ProfileAvatarInfo>
                    <Avatar width={100} height={100} avatarFrame={true} avatarId={myUser.avatar} hendelAvatar={handelAvatar}/>
                    <UserName setShadow={true} large blod center>{myUser.username}</UserName>
                </ProfileAvatarInfo>


                <ProfileContext>
                    <CardInfoLvl icon={lvl} lvl={myUser.experience.lvl} progress={myUser.experience.progress} />
                    <CardInfo icon={coins} price={myUser.coins}/>
                    <CardInfo icon={diamonds} price={myUser.crystals}/>
                    <CardInfo icon={flash} price={myUser.flash}/>
                </ProfileContext>

                <Statistic botStatistic={props.botStatistic}
                           oppStatistic={props.oppStatistic}
                           gamePlayed={props.gamePlayed}
                           gameWon={props.gameWon}
                           gameLose={props.gameLose}
                />
            </UserInfoContainer>
        </BackgroundWrapper>
    )
}

const UserInfoContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 25%;
  ${()=>{
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
      return `
        margin-top: 25%;
      `
    } else {
      return `margin-top: 5%;`
    }
  }}
`

const ProfileTitle = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  height: 50px;
`

const TitleBG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

const mapStateToProps = (state) => ({
    profile: selectTranslation(state, defaultTranslation.TR_PROFILE),
    botStatistic: selectTranslation(state, defaultTranslation.TR_BOT_STATISTIC),
    oppStatistic: selectTranslation(state, defaultTranslation.TR_OPP_STATISTIC),
    gamePlayed: selectTranslation(state, defaultTranslation.TR_GAME_PLAYED),
    gameWon: selectTranslation(state, defaultTranslation.TR_GAME_WON),
    gameLose: selectTranslation(state, defaultTranslation.TR_GAME_LOSE),
});

export default connect(mapStateToProps)(UserInfoScreen);