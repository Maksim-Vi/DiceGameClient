import React from 'react';
import styled from "styled-components";
import Text from '../../../common/Text/Text';
import RoadItems from './RoadItems/RoadItems';

const RoadContainer = (props) => {
    return (
        <Container>
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