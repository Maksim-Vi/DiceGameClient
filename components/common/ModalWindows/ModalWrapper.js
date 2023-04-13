import React from 'react';
import styled from "styled-components";
import DefaultBG from './ModalBackgrounds/DefaultBG';
import Close from '../Buttons/Close/Close';
import ButtonBack from "../Buttons/Back/ButtonBack";
import {getIosModel} from "../../utils/utils";

const ModalWrapper = (props) => {

    const {modalBG, swipe, modalVisible,lineArrow,setModalVisible,children} = props

    const renderModalBG = () =>{
        switch (modalBG) {
            case 'default': return <DefaultBG  margin={props.margin} width={props.width} height={props.height}>
                    {setModalVisible && !lineArrow && <Close close={setModalVisible}/>}
                    {children}
                </DefaultBG>
            case 'bg_black': return <BlackBG backgroundColor={props.backgroundColor}>
                    {setModalVisible && !lineArrow && <Close close={setModalVisible}/>}
                    {setModalVisible && lineArrow && <ButtonBack top={'5%'} leaveGame={setModalVisible}/>}
                    {children}
                </BlackBG>
            case 'bg_black_rewards':
                const iosModel = getIosModel()
                let position = iosModel >= 10
                    ? '1.5%'
                    : iosModel < 10 && iosModel !== 0 ? '4.5%' : '1.5%'

                return <BlackBG>
                    {setModalVisible && lineArrow && <ButtonBack top={position} leaveGame={setModalVisible}/>}
                    {children}
                </BlackBG>
            default: return children
        }
    }

    return (
        <ModalPopup>
            {renderModalBG()}
        </ModalPopup>
    )
}

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
  width: 100%;
  height: 100%;
  background: ${(props) =>  props.backgroundColor ? `${props.backgroundColor}`  : 'transparent'};

`

export default ModalWrapper;
