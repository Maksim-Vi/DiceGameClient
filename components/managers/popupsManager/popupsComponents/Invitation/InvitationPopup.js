import React from 'react';
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {useWindowDimensions} from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import ButtonWithText from "../../../../common/Buttons/ButtonWithText";
import {
    closeAllPopupsPopup,
    selectInvitationPopup,
    setInvitationPopup
} from "../../../../redux/reducers/popups/PopupsReducer";
import InvitationUserFrame from "../../../../screens/LoadingGameScreen/components/Invitation/InvitationUserFrame";
import C_DECLINE_GAME_BY_FRIEND_INVITATION
    from "../../../../protocol/messages/clients/friends/C_DECLINE_GAME_BY_FRIEND_INVITATION";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import C_ACCEPT_GAME_BY_FRIEND_INVITATION
    from "../../../../protocol/messages/clients/friends/C_ACCEPT_GAME_BY_FRIEND_INVITATION";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const InvitationPopup = (props) => {

    const dispatch = useDispatch()
    const invitation = useSelector(selectInvitationPopup)
    const myUser = useSelector(selectMyUser)

    const {width,height} = useWindowDimensions()

    const declineModal = () =>{
        const {gameId, username} = invitation.data
        Sounds.loadAndPlayFile(soundsType.click2)
        new C_DECLINE_GAME_BY_FRIEND_INVITATION(gameId, myUser.username, username)
        dispatch(setInvitationPopup({visible: false, data: null}))
    }

    const acceptInvite = () =>{
        const {gameId, username} = invitation.data

        dispatch(closeAllPopupsPopup())
        Sounds.loadAndPlayFile(soundsType.click2)
        new C_ACCEPT_GAME_BY_FRIEND_INVITATION(gameId, myUser.username, username)
        dispatch(setInvitationPopup({visible: false, data: null}))
    }

    const replaceText = () =>{
        return props.text1.replace('_name_', invitation.data?.username || 'user')
    }

    return <ModalWrapper modalBG={'default'} width={width - 35} height={height / 2} modalVisible={true}>
        <Container>
            <DeleteContainer>
                <InvitationUserFrame username={invitation.data ? invitation.data.username : 'user'}
                                     user={invitation.data.user}
                                     avatar={invitation.data?.avatarId}/>
                <Text setShadow blod large center>{replaceText()}</Text>
                <Text setShadow blod medium center>{props.text2}</Text>
            </DeleteContainer>
            <BtnsContainer>
                <ButtonWithText width={'45%'}
                                height={'40px'}
                                color={'#ee5353'}
                                text={props.decline}
                                clickHandler={declineModal}/>
                <ButtonWithText width={'45%'}
                                height={'40px'}
                                color={'#5acb57'}
                                text={props.accept}
                                clickHandler={acceptInvite}/>
            </BtnsContainer>
        </Container>
    </ModalWrapper>
}

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
`
const DeleteContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80%;
  margin-top: 20px;
  padding: 10px 30px;
  background-color: rgba(175, 82, 52, 0.64);
  border-radius: 10px;
`

const BtnsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 80%;
  height: 25%;
`
const mapStateToProps = (state) => ({
    text1: selectTranslation(state,defaultTranslation.TR_INVITE_POPUP_TXT1),
    text2: selectTranslation(state,defaultTranslation.TR_INVITE_POPUP_TXT2),
    accept: selectTranslation(state,defaultTranslation.TR_ACCEPT_FRIEND),
    decline: selectTranslation(state,defaultTranslation.TR_DECLINE_FRIEND),
});

export default connect(mapStateToProps)(InvitationPopup);
