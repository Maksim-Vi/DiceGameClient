import React from 'react';
import friends from "../../../../../assets/topPanel/friends.png";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import styled from "styled-components";
import bg from "../../../../../assets/topPanel/btns/button.png";
import BackgroundButtons from "../../../BackgroundWrapper/BackgroundButtons";
import {transitionState} from "../../../../utils/utils";
import {useSelector} from "react-redux";
import {selectInvitedCount} from "../../../../redux/reducers/players/friendsSelectors";
import InfoButton from "../../../Info/InfoButton";
import {selectDefaultParams} from "../../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../../redux/reducers/language/defaultParams";
import {store} from "../../../../redux/redux-store";

const FriendsPanel = (props) => {

    const invitedCount = useSelector(selectInvitedCount)

    const openFriendsPopup = () => {
        const isFriendEnabled = selectDefaultParams(store.getState(),defaultParams.ENABLE_FRIENDS)

        if(isFriendEnabled){
            transitionState('FriendsScreen')
        }
        Sounds.loadAndPlayFile(soundsType.click2)
    }

    return (
        <BackgroundButtons bgButton={bg}>
            {invitedCount > 0 && <InfoButton count={invitedCount}/>}

            <BtnContainer onPress={openFriendsPopup} activeOpacity={0.9}>
                <PriceImage {...props} source={friends}/>
            </BtnContainer>
        </BackgroundButtons>
    )
}
const BtnContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
`

const PriceImage = styled.Image`
  width: 45px;
  height: 45px;
`
export default FriendsPanel;