import React from 'react';
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {NativeModules, Platform, useWindowDimensions} from "react-native";
import {setSettingsMenuPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Settings from "../../../common/TopPanel/components/Bottom/Settings";
import {getIosModel} from "../../../utils/utils";
import Sounds, {soundsType} from "../../../utils/Sounds";

const isIos = getIosModel()
const isIphoneX = Platform.OS === 'ios' && isIos >= 10

const SettingsMenuPopups = () => {

    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()
    const heightPopup = Platform.OS === 'ios'
        ? isIphoneX ? 2.2 : 1.5
        : 2

    const closeModal = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
    }

    return <ModalWrapper modalBG={'default'} width={width - 20} height={height / heightPopup} modalVisible={true}>
            <Settings closeModal={closeModal}/>
    </ModalWrapper>
}

export default SettingsMenuPopups;