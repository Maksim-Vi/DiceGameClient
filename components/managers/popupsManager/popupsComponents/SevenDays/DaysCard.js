import React from 'react';
import styled from "styled-components";
import DaysCardTitle from "./DaysCardTitle";

const DaysCard = (props) => {
    return (
        <DaysCardContainer style={{ borderBottomWidth: 5 }}>
            <DaysCardTitle title={props.title}/>
            {props.children}
        </DaysCardContainer>
    )
}

const DaysCardContainer = styled.TouchableOpacity`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 130px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
`

export default DaysCard;