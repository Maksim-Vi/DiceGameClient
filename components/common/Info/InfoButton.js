import React from 'react';
import styled from 'styled-components';
import TextWithoutShadowStyle from '../Text/TextWithoutShadow';

const InfoButton = ({count}) =>{

    return (
        <InfoContainer>
            <TextCount small color={'#fff'} center>{count}</TextCount>
        </InfoContainer>
    )
}
const InfoContainer = styled.View`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -8px;
    right: -8px;
    border-radius: 100px;
    width: 20px;
    height: 20px;
    background: #CB3131;
    border: 2px solid white;
    z-index: 1;
`

const TextCount = styled(TextWithoutShadowStyle)``

export default InfoButton
