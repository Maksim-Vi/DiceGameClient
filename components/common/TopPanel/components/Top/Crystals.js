import React from "react";
import Text from "../../../Text/Text";
import styled from "styled-components";
import star from "../../../../../assets/topPanel/diamond.png";

const Crystals = (props) =>{
    return <CrystalsContainer {...props}>
        <CrystalsImage source={star} resizeMode="cover"/>
        <Text setShadow={true} blod medium center>{props.crystals}</Text>
    </CrystalsContainer>
}

const CrystalsContainer = styled.View`
  position: relative;
  border: 2px solid rgb(255,157,77);
  border-radius: 5px;
  background-color: #00eaff;
  padding: 2px 20px 2px 20px;

  ${(props)=>{
    if(props.width){
      return `
        width: ${props.width}px;
      `
    }
  }}
`

const CrystalsImage = styled.Image`
  position: absolute;
  top: -5px;
  left: -15px;
  width: 30px;
  height: 30px;
`

export default Crystals