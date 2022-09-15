import React from "react";
import Text from "../../Text/Text";
import styled from "styled-components";
import flash from "../../../../assets/topPanel/flash.png";

const Flash = (props) =>{
    return <CrystalsContainer>
        <FlashImage source={flash} />
        <Text blod medium>{props.crystals}</Text>
    </CrystalsContainer>
}

const CrystalsContainer = styled.View`
  position: relative;
  border: 2px solid rgb(255,157,77);
  border-radius: 5px;
  background-color: aqua;
  padding: 2px 20px 2px 20px;
`

const FlashImage = styled.Image`
  position: absolute;
  top: -5px;
  left: -15px;
  width: 30px;
  height: 30px;
`

export default Flash