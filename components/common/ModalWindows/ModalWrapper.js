import React from 'react';
import styled from "styled-components";
import Modal from "react-native-modal";
import DefaultBG from './ModalBackgrounds/DefaultBG';
import Close from '../Buttons/Close/Close';
import {Platform, StatusBar, useWindowDimensions} from 'react-native';
import {PresentationStyle} from "react-native-modal/dist/types";

const ModalWrapper = (props) => {
   
    const {modalBG, swipe, modalVisible,setModalVisible,children} = props

    const renderModalBG = () =>{
        switch (modalBG) {
            case 'default': return <DefaultBG width={props.width} height={props.height}>
                    {setModalVisible && <Close close={setModalVisible}/>}
                    {children}
                </DefaultBG>
            case 'bg_black': return <React.Fragment>
                    {setModalVisible && <Close close={setModalVisible}/>}
                    {children}
                </React.Fragment>
            default: return children
        }
    }

    return (
        <Modal animationIn={'slideInUp'}
               animationInTiming={300}
               animationOut={'slideOutDown'}
               animationOutTiming={300}
               coverScreen={true}
               deviceWidth={Platform.OS === "ios" ? useWindowDimensions().width : useWindowDimensions().width + StatusBar.currentHeight * 2}
               deviceHeight={Platform.OS === "ios" ? useWindowDimensions().height : useWindowDimensions().height + StatusBar.currentHeight * 2}
               statusBarTranslucent
               hardwareAccelerated={false}
               PresentationStyle={'overFullScreen'}
               onSwipeComplete={() => setModalVisible(false)}
               swipeDirection={swipe ? swipe : null}
               isVisible={modalVisible}>
            <ModalContainer>
                {renderModalBG()}
            </ModalContainer>
        </Modal>
    );
}

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const BtnClose = styled.View`

`


export default ModalWrapper;

// swipe - 'up', 'down', 'left, or 'right',