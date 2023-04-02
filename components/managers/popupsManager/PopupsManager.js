import React from 'react'
import {connect, useSelector} from 'react-redux'
import styled from 'styled-components'
import {selectMyUser} from '../../redux/reducers/players/PlayersReducer'
import * as popups from '../../redux/reducers/popups/PopupsReducer'
import AvatarPopups from './popupsComponents/AvatarPopups'
import {StatusBar} from "react-native";
import TestBtnsPopups from './popupsComponents/TestBtnsPopups'
import SettingsMenuPopups from "./popupsComponents/SettingsMenuPopups";
import LevelUpPopup from "./popupsComponents/LevelUpPopups";
import {selectActiveTabApp} from "../../redux/reducers/Websocket/WebsocketReducer";
import SevenDaysGift from "./popupsComponents/SevenDays/SevenDaysGift";
import InfoPopups from "./popupsComponents/InfoPopups";
import ChangeUserNameGoogle from "./popupsComponents/GooglePopups/ChangeUserNameGoogle";
import LostConnectionOpponent from "./popupsComponents/Game/LostConnectionOpponent";
import CollectItemPopup from "./popupsComponents/Collection/CollectItemPopup";
import BotTypeGame from "./popupsComponents/Game/BotTypeGame";
import {selectRestoreGame} from "../../redux/reducers/game/GameReducer";
import RewardsPopup from "./popupsComponents/Rewards/RewardsPopup";
import DeleteAccount from "./popupsComponents/DeleteAccount/DeleteAccount";
import TutorialPopup from "./popupsComponents/Tutorial/TutorialPopup";
import InvitationPopup from "./popupsComponents/Invitation/InvitationPopup";
import ADFlashPopup from "./popupsComponents/ADPopups/ADFlashPopup";
import NotEnoughFlashPopup from "./popupsComponents/NotEnoughFlashPopup";

const PopupsManager = (props) => {

    const isRestoreGame = useSelector(selectRestoreGame)

    const renderSevenDays = () =>{
        if( props.sevenDaysPopup.visible &&
            (props.activeTabApp === 'App' || props.activeTabApp === 'MainScreen') &&
            !isRestoreGame &&
            !props.tutorialPopup.visible
        ){
            return <SevenDaysGift />
        }
    }

    return (
        <PopupConteiner>
            <StatusBar hidden={true} style="light"/>

            {props.deleteAccountPopup.visible && <DeleteAccount />}
            {
                props.lvlUpPopup.visible &&
                (props.activeTabApp === 'App' || props.activeTabApp === 'MainScreen') &&
                <LevelUpPopup/>
            }
            {props.tutorialPopup.visible && <TutorialPopup />}
            { renderSevenDays() }
            {props.avatarPopup.visible && <AvatarPopups user={props.user}/>}
            {props.settingsPopup.visible && <SettingsMenuPopups/>}
            {props.infoPopup.visible && <InfoPopups />}
            {props.googleConfirmUsernamePopup.visible && <ChangeUserNameGoogle />}
            {props.lostConnOpponentPopup.visible && <LostConnectionOpponent />}
            {props.collectItemPopup.visible && <CollectItemPopup data={props.collectItemPopup.data}/>}
            {props.botGameTypesPopup.visible && <BotTypeGame />}
            {props.rewardsPopup.visible && <RewardsPopup />}
            {props.invitationPopup.visible && <InvitationPopup />}
            {props.adFlashPopup.visible && <ADFlashPopup />}
            {props.notEnoughFlashPopup.visible && <NotEnoughFlashPopup />}

            {props.testBtnsPopup.visible && <TestBtnsPopups />}
        </PopupConteiner>
    )
}

const PopupConteiner = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
`

const mapStateToProps = (state) => ({
    avatarPopup: popups.selectAvatarPopup(state),
    settingsPopup: popups.selectSettingsPopup(state),
    lvlUpPopup: popups.selectLevelUpPopup(state),
    sevenDaysPopup: popups.selectSevenDaysGiftPopup(state),
    infoPopup: popups.selectInfoPopup(state),
    testBtnsPopup: popups.selectTestBtnsPopup(state),
    user: selectMyUser(state),
    activeTabApp: selectActiveTabApp(state),
    googleConfirmUsernamePopup: popups.selectGoogleConfirmUsernamePopup(state),
    lostConnOpponentPopup: popups.selectLostConnOpponentPopup(state),
    collectItemPopup: popups.selectCollectItemPopup(state),
    botGameTypesPopup: popups.selectBotGameTypesPopup(state),
    rewardsPopup: popups.selectRewardsPopup(state),
    deleteAccountPopup: popups.selectDeleteAccountPopup(state),
    tutorialPopup: popups.selectTutorialPopup(state),
    invitationPopup: popups.selectInvitationPopup(state),
    adFlashPopup: popups.selectADFlashPopup(state),
    notEnoughFlashPopup: popups.selectNotEnoughFlashPopup(state),
});

export default connect(mapStateToProps)(PopupsManager);