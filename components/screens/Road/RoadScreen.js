import React from 'react';
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper';
import mainBg from '../../../assets/road/road_bg.jpeg'
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import RoadContainer from './components/RoadContainer';
import {NativeModules, Platform} from "react-native";

const RoadScreen = (props) => {
    return (
        <BackgroundWrapper gackground={mainBg}>
            <ButtonBack top={Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated ? '10px' : '20px'}
                        left={Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated ? '30px' : '10px'}
                        goMainPage={true}/>
            <RoadContainer />
        </BackgroundWrapper>
    );
};

export default RoadScreen;