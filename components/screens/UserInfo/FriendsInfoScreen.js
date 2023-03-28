import React from 'react';
import styled from "styled-components";
import BackgroundWrapper from "../../common/BackgroundWrapper/BackgroundWrapper";
import ButtonBack from "../../common/Buttons/Back/ButtonBack";
import Text from "../../common/Text/Text";
import CardInfo from "./components/CardInfo";
import Avatar from "../../common/Avatars/Avatar";
import {connect, useSelector} from "react-redux";
import Statistic from "./components/Statistic";
import coins from '../../../assets/topPanel/coins.png'
import diamonds from '../../../assets/topPanel/diamond.png'
import flash from '../../../assets/topPanel/flash.png'
import lvl from '../../../assets/topPanel/star_lvl.png'
import CardInfoLvl from "./components/CardInfoLvl";
import {Platform, useWindowDimensions} from "react-native";
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {getIosModel} from "../../utils/utils";
import bgTitle from "../../../assets/bg/title_info_text_BG.png";
import ButtonWithText from "../../common/Buttons/ButtonWithText";
import C_DELETE_FROM_FRIENDS from "../../protocol/messages/clients/friends/C_DELETE_FROM_FRIENDS";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";
import {useNavigation} from "@react-navigation/native";
import C_SEND_GAME_INVITATION_TO_FRIEND from "../../protocol/messages/clients/friends/C_SEND_GAME_INVITATION_TO_FRIEND";

const FriendsInfoScreen = (props) => {

    const {width} = useWindowDimensions()
    const myUser = useSelector(selectMyUser)
    const navigation = useNavigation()

    const getStatistic = () =>{
        let data = {}
        props.route.params.statistics.forEach(item=>{
            if(item['bot']){
                data['bot'] = item['bot']
            } else if(item['opponent']){
                data['opponent'] = item['opponent']
            }
        })

        return data
    }

    const deleteFriend = () =>{
        if(myUser.username && props.route.params.username){
            new C_DELETE_FROM_FRIENDS(myUser.username, props.route.params.username)
            navigation.goBack()
        }
    }

    const challenge = () =>{
        if(myUser.username && props.route.params.username){
            new C_SEND_GAME_INVITATION_TO_FRIEND(myUser.username, props.route.params.username)
        }
    }

    const goBack = () =>{
        navigation.goBack()
    }


    return (
        <BackgroundWrapper>
            <ButtonBack top={'3%'} leaveGame={goBack} />

            <UserInfoContainer>
                <ProfileTitle width={width}>
                    <TitleBG source={bgTitle} resizeMode={'stretch'}>
                        <Text setShadow={true} large blod center>{props.friend}</Text>
                    </TitleBG>
                </ProfileTitle>

                <ProfileAvatarInfo>
                    <Avatar width={100} height={100} avatarFrame={true} avatarId={props.route.params.avatar} />
                    <UserName setShadow={true} large blod center>{props.route.params.username}</UserName>
                </ProfileAvatarInfo>


                <ProfileContext>
                    <CardInfoLvl icon={lvl} lvl={props.route.params.experience.lvl} progress={props.route.params.experience.progress} />
                    <CardInfo icon={coins} price={props.route.params.coins}/>
                    <CardInfo icon={diamonds} price={props.route.params.crystals}/>
                    <CardInfo icon={flash} price={props.route.params.flash}/>
                </ProfileContext>

                <ButtonContainer>
                    <ButtonWithText width={'100px'}
                                    height={'50px'}
                                    text={props.deleteFriend}
                                    color={'#e84d4d'}
                                    clickHandler={deleteFriend} />
                    <ButtonWithText width={'100px'}
                                    height={'50px'}
                                    text={props.challenge}
                                    clickHandler={challenge} />
                </ButtonContainer>

                <Statistic botStatistic={props.botStatistic}
                           oppStatistic={props.oppStatistic}
                           statistics={getStatistic()}
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
  margin-top: 20%;
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
  width:${(props)=> props.width < 400 ? `65%` : '80%'};
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
  margin-top: 5%;
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
  margin-top: 5%;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 10px;
`


const mapStateToProps = (state) => ({
    friend: selectTranslation(state, defaultTranslation.TR_FRIEND),
    botStatistic: selectTranslation(state, defaultTranslation.TR_BOT_STATISTIC),
    oppStatistic: selectTranslation(state, defaultTranslation.TR_OPP_STATISTIC),
    gamePlayed: selectTranslation(state, defaultTranslation.TR_GAME_PLAYED),
    gameWon: selectTranslation(state, defaultTranslation.TR_GAME_WON),
    gameLose: selectTranslation(state, defaultTranslation.TR_GAME_LOSE),
    challenge: selectTranslation(state, defaultTranslation.TR_CHALLENGE_FRIEND),
    deleteFriend: selectTranslation(state, defaultTranslation.TR_DELETE_FRIEND),

});

export default connect(mapStateToProps)(FriendsInfoScreen);