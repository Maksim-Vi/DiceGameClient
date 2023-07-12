import React from 'react';
import styled from 'styled-components';
import TextWithoutShadowStyle from '../Text/TextWithoutShadow';

const InfoWithoutNumberButton = ({top = -3, right = 0}) =>{

    return  <InfoContainer top={top} right={right}/>
}
const InfoContainer = styled.View`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: ${props => props.top ? `${props.top}px`: '0'};
    right: ${props => props.right ? `${props.right}px` : '0'};
    border-radius: 100px;
    width: 15px;
    height: 15px;
    background: #CB3131;
    z-index: 1;
`

const TextCount = styled(TextWithoutShadowStyle)``

export default InfoWithoutNumberButton
