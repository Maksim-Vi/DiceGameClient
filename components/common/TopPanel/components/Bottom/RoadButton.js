import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";
import roadImg from "../../../../../assets/road/road-icon.png";
import InfoButton from "../../../Info/InfoButton";
import Text from "../../../Text/Text";
import {useSelector} from "react-redux";

const RoadButton = () =>{

    const navigaion = useNavigation()
    const availableToClaimMissionsRoad = useSelector(state => state.road.availableToClaimMissionsRoad)
    
    const OpenRoad = () => {
        navigaion.navigate('RoadScreen')
    }

    return (
        <RoadBtn onPress={() => OpenRoad()}>
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
    margin-top: 5px;
    background-color: rgba(13, 64, 194, 0.88);
`
const RoadImg = styled.Image`
    margin: auto;
    width: 90%;
    height: 90%;
`

export default RoadButton