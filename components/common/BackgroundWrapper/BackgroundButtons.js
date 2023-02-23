import React from 'react';
import styled from "styled-components";
import bg from "../../../assets/topPanel/btns/button.png";

const BackgroundButtons = props => {
    return (
        <BtnBackground {...props} source={props.bgButton ? props.bgButton : bg} resizeMode={'stretch'}>
            {props.children}
        </BtnBackground>
    )
};

const BtnBackground = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.marginTop ? `${props.marginTop}px` : '0px'};
  margin-left: ${props => props.marginLeft ? `${props.marginLeft}px` : '0px'};
  margin-right: ${props => props.marginRight ? `${props.marginRight}px` : '0px'};
  margin-bottom: ${props => props.marginBottom ? `${props.marginBottom}px` : '0px'};
  
  width: ${props => props.width ? `${props.width}%` : '60px'};
  height: ${props => props.height ? `${props.height}px` : '60px'};
`

export default BackgroundButtons;