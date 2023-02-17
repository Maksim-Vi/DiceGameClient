import React from 'react';
import closeImg from "../../../../assets/modal/button_close.png";
import styled from "styled-components";
import Sounds, {soundsType} from "../../../utils/Sounds";

const Close = (props) => {

    const onClose = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        props.close()
    }

    return (
        <CloseContainer>
            <CloseBtn onPress={onClose}>
                <CloseImg source={closeImg} resizeMode={ 'stretch'} />
            </CloseBtn>
        </CloseContainer>
    )
}


const CloseContainer = styled.View`
    position: absolute;
    right: -15px;
    top: -15px;
    z-index: 100;
`
const CloseImg = styled.Image`
  width: 35px;
  height: 35px;
`
const CloseBtn = styled.TouchableOpacity`
 
`

export default Close;