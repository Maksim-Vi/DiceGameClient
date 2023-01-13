import React from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";

const DaysCardTitle = (props) => {
    return (
        <Title>
            <Text setShadow={true} center>{props.title}</Text>
        </Title>
    )
}

const Title = styled.View`
  position: absolute;
  top: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 105%;
  height: 25px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: #399d15;
  border: 3px solid rgba(59, 59, 59, 0.37);
`

export default DaysCardTitle;