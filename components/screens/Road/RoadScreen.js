import React from 'react';
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper';
import mainBg from '../../../assets/road/road_bg.jpeg'
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import RoadContainer from './components/RoadContainer';
import {Platform} from "react-native";
import {getIosModel} from "../../utils/utils";

const RoadScreen = (props) => {

    const isIos = getIosModel()

    return (
        <BackgroundWrapper gackground={mainBg}>
            <ButtonBack top={Platform.OS === 'ios' && isIos >= 10 ? '7%' : '3%'}
                        left={'1%'}
                        goMainPage={true}/>
            <RoadContainer />
        </BackgroundWrapper>
    );
};

export default RoadScreen;