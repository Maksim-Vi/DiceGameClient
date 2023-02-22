import React from 'react';
import friends from "../../../../../assets/topPanel/friends.png";
import {setInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import styled from "styled-components";
import bg from "../../../../../assets/topPanel/btns/button.png";
import BackgroundButtons from "../../../BackgroundWrapper/BackgroundButtons";

const FriendsPanel = (props) => {

    const dispatch = useDispatch()

    const openFriendsPopup = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setInfoPopup({
            visible: true,
            data: {text: 'Friends will be available after some time. Have a good game!'}
        }))
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