import React from 'react';
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {useWindowDimensions} from "react-native";
import {setSettingsMenuPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Settings from "../../../common/TopPanel/components/Bottom/Settings";
import styled from "styled-components";

const SettingsMenuPopups = (props) => {

    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const closeModal = () =>{
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
    }

    return <ModalWrapper modalBG={'default'} width={width - 50} height={height / 8} modalVisible={true} setModalVisible={closeModal}>
        <Container>
            <Settings />
        </Container>
    </ModalWrapper>
}

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export default SettingsMenuPopups;