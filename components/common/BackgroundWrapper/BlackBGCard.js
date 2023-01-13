import React from 'react';
import styled from "styled-components";

const BlackBgCard = () => {
    return (
        <BlackBG />
    )
}

const BlackBG = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 105%;
  height: 105%;
  background-color: rgba(49, 49, 49, 0.47);
`
export default BlackBgCard;