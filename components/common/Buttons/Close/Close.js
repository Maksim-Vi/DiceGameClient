import React from 'react';
import closeImg from "../../../../assets/modal/button_close.png";
import styled from "styled-components";

const Close = (props) => {
    return (
        <CloseContainer>
            <CloseBtn onPress={props.close}>
                <CloseImg source={closeImg} resizeMode={ 'stretch'} />
            </CloseBtn>
        </CloseContainer>
    )
}


const CloseContainer = styled.View`
    position: absolute;
    right: -15px;
    top: -15px;
`
const CloseImg = styled.Image`
  width: 35px;
  height: 35px;
`
const CloseBtn = styled.TouchableOpacity`
 
`

export default Close;