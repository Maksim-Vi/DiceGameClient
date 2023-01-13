import React from 'react';
import styled from 'styled-components';
import Text from '../Text/Text';

const InfoButton = ({count}) =>{
    return (
        <InfoContainer>
            <Text small color={'#fff'} center>{count}</Text>
        </InfoContainer>
    )
}
const InfoContainer = styled.View`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -5px;
    right: -5px;
    border-radius: 100px;
    width: 20px;
    height: 20px;
    background: #CB3131;
    border: 2px solid white;
  z-index: 1;
`

export default InfoButton
