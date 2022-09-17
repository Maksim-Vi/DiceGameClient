import React from "react";
import Text from "../../../Text/Text";
import styled from "styled-components";
import coins from "../../../../../assets/topPanel/coins.png";

const Coins = (props) =>{
    return <CoinsContainer>
        <CoinsImage source={coins} />
        <Text blod medium>{props.coins}</Text>
    </CoinsContainer>
}

const CoinsContainer = styled.View`
  position: relative;
  border: 2px solid rgb(255,157,77);
  border-radius: 5px;
  background-color: aqua;
  padding: 2px 20px 2px 20px;
`

const CoinsImage = styled.Image`
  position: absolute;
  top: -5px;
  left: -15px;
  width: 30px;
  height: 30px;
`

export default Coins
