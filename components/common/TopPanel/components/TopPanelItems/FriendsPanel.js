import React from 'react';
import friends from "../../../../../assets/topPanel/friends.png";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import styled from "styled-components";
import bg from "../../../../../assets/topPanel/btns/button.png";
import BackgroundButtons from "../../../BackgroundWrapper/BackgroundButtons";
import {transitionState} from "../../../../utils/utils";

const FriendsPanel = (props) => {

    const openFriendsPopup = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        transitionState('FriendsScreen')
    }

    return (
        <BackgroundButtons bgButton={bg}>
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