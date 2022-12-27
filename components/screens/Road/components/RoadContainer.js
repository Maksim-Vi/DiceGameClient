import React from 'react';
import styled from "styled-components";
import Text from '../../../common/Text/Text';
import RoadItems from './RoadItems/RoadItems';
import RoadInfoMission from "./RoadInfoMission/RoadInfoMission";

const RoadContainer = (props) => {
    return (
        <Container>
            <RoadInfoMission />
           <RoadItems />
        </Container>
    );
};

const Container = styled.View`
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`
export default RoadContainer;