import React from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";

const RoadTimer = (props) => {

    if(!props.activeMission.endTime) return null

    return (
        <TimerContainer>
            <Text>Timer:</Text>
            <Text>00:00</Text>
        </TimerContainer>
    );
};

const TimerContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default RoadTimer;