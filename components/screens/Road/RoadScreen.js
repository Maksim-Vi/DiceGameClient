import React from 'react';
import styled from "styled-components";
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper';
import mainBg from '../../../assets/road/road_bg.jpeg'
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import RoadContainer from './components/RoadContainer';

const RoadScreen = (props) => {
    return (
        <BackgroundWrapper gackground={mainBg}>
            <ButtonBack />
            <RoadContainer />
        </BackgroundWrapper>
    );
};

const RoadScreenContainer = styled.View`
    position: relative;
    flex: 1;
`
export default RoadScreen;