import React from 'react';
import styled from "styled-components";
import RoadButton from '../RoadButtons/RoadButton';
import RoadItemInfo from './RoadItemInfo';

const RoadItem = (props) => {
    return (
        <RoadItemContainer {...props}>
            <RoadItemInfo type={props.type} 
                          rewardType={props.rewardType}
                          price={props.price} />
            <RoadButton type={props.type}/>
        </RoadItemContainer>
    )
};

const RoadItemContainer = styled.TouchableOpacity`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    ${(props)=>{
        return `
            top: ${props.top}%;
            left: ${props.left}%;
        `
    }}
`

export default RoadItem;