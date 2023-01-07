import React from 'react';
import styled from "styled-components";
import Text from "../../../common/Text/Text";

const CardInfoLvl = (props) => {
    return (
        <CardContainer>
            <Img source={props.icon} resizeMode={ 'stretch'} />
            <Text setShadow={true} madium blod>lvl: {props.lvl}</Text>
            <Text setShadow={true} madium blod>{props.progress.toFixed(2)}%</Text>
        </CardContainer>
    )
}
const Img = styled.Image`
  width: 30px;
  height: 30px;
`

const CardContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80px;
  height: 100px;
  background-color: #d3c5a9;
  border-radius: 20px;
  border: 3px solid #a6945f;
`
export default CardInfoLvl;