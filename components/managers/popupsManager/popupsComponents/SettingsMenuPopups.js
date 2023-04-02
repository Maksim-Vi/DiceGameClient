import React from 'react';
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {Platform, useWindowDimensions} from "react-native";
import {setSettingsMenuPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Settings from "../../../common/TopPanel/components/Bottom/Settings";
import {getIosModel} from "../../../utils/utils";
import Sounds, {soundsType} from "../../../utils/Sounds";
import ButtonBack from "../../../common/Buttons/Back/ButtonBack";
import back from "../../../../assets/common/btns/button_page_back.png";
import styled from "styled-components";
import {store} from "../../../redux/redux-store";
import {setActiveTabApp} from "../../../redux/reducers/Websocket/WebsocketReducer";

const margin = 50
const marginButtons = 30
const countTabsHeight = (6 * (30 + marginButtons)) + margin
const isIos = getIosModel()
const isIphoneX = Platform.OS === 'ios' && isIos >= 10

const SettingsMenuPopups = () => {

    const { width } = useWindowDimensions();
    const dispatch = useDispatch()

    const closeModal = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
    }

    const goBack = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
    }

    return <>
        <ModalWrapper modalBG={'default'} width={width - 35} height={countTabsHeight} modalVisible={true} setModalVisible={goBack}>
            <Settings closeModal={closeModal}/>
        </ModalWrapper>
    </>

}

export default SettingsMenuPopups;