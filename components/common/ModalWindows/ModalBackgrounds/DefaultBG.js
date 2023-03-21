import React from 'react'
import styled from 'styled-components'
import bgTitle from "../../../../assets/modal/popup_bg.png";

const DefaultBG = (props) =>{
    return (
        <ContainerBG {...props} source={bgTitle} resizeMode={'stretch'}>
            {props.children}
        </ContainerBG>
    )
}

const ContainerBG = styled.ImageBackground`
  display: flex;
  align-items: center;
  width: ${(props) =>  props.width ? `${Math.floor(props.width)}px`  : '100%'};
  height: ${(props) =>  props.height ? `${Math.floor(props.height)}px` : '50%'};

`

export default DefaultBG