import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {selectMyUser} from '../../redux/reducers/players/PlayersReducer'
import {
    selectAvatarPopup,
    selectBotGameTypesPopup,
    selectCollectItemPopup,
    selectGoogleConfirmUsernamePopup,
    selectInfoPopup,
    selectLevelUpPopup,
    selectLostConnOpponentPopup,
    selectSettingsPopup,
    selectSevenDaysGiftPopup,
    selectTestBtnsPopup
} from '../../redux/reducers/popups/PopupsReducer'
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

const PopupsManager = (props) => {
    return (
        <PopupConteiner>
            <StatusBar hidden={true} style="light"/>

            {props.avatarPopup.visible && <AvatarPopups user={props.user}/>}
            {props.settingsPopup.visible && <SettingsMenuPopups/>}
            {props.lvlUpPopup.visible && (props.activeTabApp === 'App' || props.activeTabApp === 'MainScreen') && <LevelUpPopup/>}
            {props.sevenDaysPopup.visible && <SevenDaysGift />}
            {props.infoPopup.visible && <InfoPopups />}
            {props.googleConfirmUsernamePopup.visible && <ChangeUserNameGoogle />}
            {props.lostConnOpponentPopup.visible && <LostConnectionOpponent />}
            {props.collectItemPopup.visible && <CollectItemPopup data={props.collectItemPopup.data}/>}
            {props.botGameTypesPopup.visible && <BotTypeGame />}


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
    avatarPopup: selectAvatarPopup(state),
    settingsPopup: selectSettingsPopup(state),
    lvlUpPopup: selectLevelUpPopup(state),
    sevenDaysPopup: selectSevenDaysGiftPopup(state),
    infoPopup: selectInfoPopup(state),
    testBtnsPopup: selectTestBtnsPopup(state),
    user: selectMyUser(state),
    activeTabApp: selectActiveTabApp(state),
    googleConfirmUsernamePopup: selectGoogleConfirmUsernamePopup(state),
    lostConnOpponentPopup: selectLostConnOpponentPopup(state),
    collectItemPopup: selectCollectItemPopup(state),
    botGameTypesPopup: selectBotGameTypesPopup(state),
});

export default connect(mapStateToProps)(PopupsManager);