import React, {useEffect} from 'react';
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {Platform, useWindowDimensions} from "react-native";
import {setSettingsMenuPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Settings from "../../../common/TopPanel/components/Bottom/Settings";
import {getIosModel} from "../../../utils/utils";
import Sounds, {soundsType} from "../../../utils/Sounds";
import * as NavigationBar from "expo-navigation-bar";

const margin = 50
const marginButtons = 30
const countTabsHeight = (6 * (30 + marginButtons)) + margin

const SettingsMenuPopups = () => {

    const visibility = NavigationBar.useVisibility()
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

    const AndroidSoftwareNavHidden = async () =>{
        await NavigationBar.setPositionAsync('absolute')
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBehaviorAsync('overlay-swipe')
    }

    useEffect(()=>{
        if(Platform.OS === 'android'){
            if(visibility === 'visible'){
                AndroidSoftwareNavHidden()
            }
        }
    },[visibility])

    return <ModalWrapper modalBG={'default'} width={width - 35} height={countTabsHeight} modalVisible={true} setModalVisible={goBack}>
        <Settings closeModal={closeModal}/>
    </ModalWrapper>
}

export default SettingsMenuPopups;