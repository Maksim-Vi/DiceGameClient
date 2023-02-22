import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";
import roadImg from "../../../../../assets/road/road-icon.png";
import InfoButton from "../../../Info/InfoButton";
import Text from "../../../Text/Text";
import {useSelector} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bg from "../../../../../assets/topPanel/btns/button.png";
import BackgroundButtons from "../../../BackgroundWrapper/BackgroundButtons";

const RoadButton = () =>{

    const navigaion = useNavigation()
    const availableToClaimMissionsRoad = useSelector(state => state.road.availableToClaimMissionsRoad)
    
    const OpenRoad = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        navigaion.navigate('RoadScreen')
    }

    return (
        <BackgroundButtons marginBottom={5} bgButton={bg}>
            <RoadBtn onPress={OpenRoad} activeOpacity={0.9}>
                {availableToClaimMissionsRoad > 0 && <InfoButton count={availableToClaimMissionsRoad}/>}
                <RoadImg source={roadImg} resizeMode='stretch'/>
            </RoadBtn>
        </BackgroundButtons>
    )
}

const RoadBtn = styled.TouchableOpacity`
    position: relative;
    width: 45px;
    height: 45px;
`
const RoadImg = styled.Image`
    margin: auto;
    width: 75%;
    height: 75%;
`

export default RoadButton