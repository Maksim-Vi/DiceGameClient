import React from 'react';
import settings from '../../../../../assets/topPanel/settings.png'
import {useDispatch} from "react-redux";
import {setSettingsMenuPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import BackgroundButtons from "../../../BackgroundWrapper/BackgroundButtons";
import bg from "../../../../../assets/topPanel/btns/button.png";
import styled from "styled-components";

const MenuPanel = (props) => {

    const dispatch = useDispatch()

    const openSettingsPopup = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: true, data: null}))
    }

    return (
        <BackgroundButtons bgButton={bg}>
            <BtnContainer onPress={openSettingsPopup} activeOpacity={0.9}>
                <PriceImage {...props} source={settings}/>
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
export default MenuPanel;