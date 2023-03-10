import React from 'react';
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {Platform, useWindowDimensions} from "react-native";
import {setSettingsMenuPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Settings from "../../../common/TopPanel/components/Bottom/Settings";
import {getIosModel} from "../../../utils/utils";
import Sounds, {soundsType} from "../../../utils/Sounds";

const margin = 50
const marginButtons = 30
const countTabsHeight = (6 * (30 + marginButtons)) + margin
const isIos = getIosModel()
const isIphoneX = Platform.OS === 'ios' && isIos >= 10

const SettingsMenuPopups = () => {

    const { width } = useWindowDimensions();
    const dispatch = useDispatch()
    // const heightPopup = Platform.OS === 'ios'
    //     ? isIphoneX ? countTabsHeight : countTabsHeight
    //     : countTabsHeight

    const closeModal = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
    }

    return <ModalWrapper modalBG={'default'} width={width - 20} height={countTabsHeight} modalVisible={true}>
            <Settings closeModal={closeModal}/>
    </ModalWrapper>
}

export default SettingsMenuPopups;