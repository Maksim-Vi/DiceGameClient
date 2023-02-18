import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";
import roadImg from "../../../../../assets/road/road-icon.png";
import InfoButton from "../../../Info/InfoButton";
import Text from "../../../Text/Text";
import {useSelector} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";

const RoadButton = () =>{

    const navigaion = useNavigation()
    const availableToClaimMissionsRoad = useSelector(state => state.road.availableToClaimMissionsRoad)
    
    const OpenRoad = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        navigaion.navigate('RoadScreen')
    }

    return (
        <RoadBtn onPress={OpenRoad}>
            {availableToClaimMissionsRoad > 0 && <InfoButton count={availableToClaimMissionsRoad}/>}
            <RoadImg source={roadImg} resizeMode='stretch'/>
        </RoadBtn>
    )
}

const RoadBtn = styled.TouchableOpacity`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 5px;
    margin: 5px;
    background-color: rgb(1,1,70);
`
const RoadImg = styled.Image`
    margin: auto;
    width: 75%;
    height: 75%;
`

export default RoadButton