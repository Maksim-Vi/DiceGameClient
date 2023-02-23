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
        <BtnBackground source={bg} resizeMode={'stretch'}>
            <RoadBtn onPress={OpenRoad} activeOpacity={0.9}>
                {availableToClaimMissionsRoad > 0 && <InfoButton count={availableToClaimMissionsRoad}/>}
                <RoadImg source={roadImg} resizeMode='stretch'/>
                <RoadTextContainer>
                    <Text setShadow={true} madium blod center>Road</Text>
                </RoadTextContainer>
            </RoadBtn>
        </BtnBackground>
    )
}

const BtnBackground = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
`

const RoadBtn = styled.TouchableOpacity`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`
const RoadImg = styled.Image`
    width: 50px;
    height: 50px;
`

const RoadTextContainer = styled.View`
  position: absolute;
  bottom: -5px;
`

export default RoadButton