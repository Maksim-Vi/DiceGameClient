import React from 'react';
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {useWindowDimensions} from "react-native";
import {setSettingsMenuPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Settings from "../../../common/TopPanel/components/Bottom/Settings";
import styled from "styled-components";

const SettingsMenuPopups = () => {

    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const closeModal = () =>{
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
    }

    return <ModalWrapper modalBG={'default'} width={width - 50} height={height / 3} modalVisible={true}>
            <Settings closeModal={closeModal}/>
    </ModalWrapper>
}

export default SettingsMenuPopups;