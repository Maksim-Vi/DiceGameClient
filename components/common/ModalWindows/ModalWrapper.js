import React, {useEffect} from 'react';
import styled from "styled-components";
import Modal from "react-native-modal";
import DefaultBG from './ModalBackgrounds/DefaultBG';
import Close from '../Buttons/Close/Close';
import {Platform, StatusBar, useWindowDimensions} from 'react-native';
import Text from "../Text/Text";

const ModalWrapper = (props) => {

    const {modalBG, swipe, modalVisible,setModalVisible,children} = props

    const renderModalBG = () =>{
        switch (modalBG) {
            case 'default': return <DefaultBG  margin={props.margin} width={props.width} height={props.height}>
                    {setModalVisible && <Close close={setModalVisible}/>}
                    {children}
                </DefaultBG>
            case 'bg_black': return <BlackBG>
                    {setModalVisible && <Close close={setModalVisible}/>}
                    {children}
                </BlackBG>
            default: return children
        }
    }

    // return (
    //     <Modal animationIn={'slideInUp'}
    //            animationInTiming={300}
    //            animationOut={'slideOutDown'}
    //            animationOutTiming={300}
    //            coverScreen={true}
    //            deviceWidth={Platform.OS === "ios" ? useWindowDimensions().width : useWindowDimensions().width + StatusBar.currentHeight * 2}
    //            deviceHeight={Platform.OS === "ios" ? useWindowDimensions().height : useWindowDimensions().height + StatusBar.currentHeight * 2}
    //            statusBarTranslucent
    //            hardwareAccelerated={false}
    //            PresentationStyle={'overFullScreen'}
    //            onSwipeComplete={() => setModalVisible(false)}
    //            swipeDirection={swipe ? swipe : null}
    //            isVisible={modalVisible}>
    //         <ModalContainer>
    //             {renderModalBG()}
    //         </ModalContainer>
    //     </Modal>
    // );

    return (
        <ModalContainer>
            <ModalPopup>
                {renderModalBG()}
            </ModalPopup>
        </ModalContainer>
    )
}

const ModalContainer = styled.View`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.44);
`


const ModalPopup = styled.View`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const BlackBG = styled.View`
  position: relative;
`


// const ModalContainer = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `

export default ModalWrapper;

// swipe - 'up', 'down', 'left, or 'right',