import React from 'react';
import styled from "styled-components";
import DefaultBG from "../../../common/ModalWindows/ModalBackgrounds/DefaultBG";
import {useWindowDimensions} from "react-native";
import {useSelector} from "react-redux";
import {selectStartRoadTime} from "../../../redux/reducers/road/RoadReducer";
import {selectDefaultParams} from "../../../redux/reducers/language/LanguageReducer";
import DefaultParams from "../../../redux/reducers/language/defaultParams";
import RoadEndTimeContainer from "./RoadTimeContainer/RoadEndTimeContainer";
import Text from "../../../common/Text/Text";
import dicy from "../../../../assets/tutorial/dicy_3.png";
import C_GET_MISSION_ROAD_MAP from "../../../protocol/messages/clients/road/C_GET_MISSION_ROAD_MAP";

const EmptyRoadContainer = (props) => {

    const {width, height} = useWindowDimensions()
    const startRoadTime = useSelector(selectStartRoadTime);
    const startRoadTimeParam = useSelector(state => selectDefaultParams(state, DefaultParams.ROAD_START_TIME));

    const getStartRoadTime = () => {
        const currentTime = Date.now()
        const roadTimeParam = Date.parse(startRoadTimeParam)

        if(startRoadTime > 0){
            if((startRoadTime - currentTime) > 0){
                return startRoadTime + 5000
            }
        }

        if(typeof +roadTimeParam === 'number' && +roadTimeParam > 0){
            if((roadTimeParam - currentTime) > 0){
                return roadTimeParam + 5000
            }
        }

        return -1
    }

    const loadRoad = () =>{
        new C_GET_MISSION_ROAD_MAP()
    }

    return (
        <Container>
            <DefaultBG width={width - 20} height={height / 2}>
                <Text setShadow blod large>Road will start soon!</Text>
                <Text setShadow blod medium>play, get missions and collect your rewards!</Text>
                <Dicy source={dicy} resizeMode={'contain'}/>
                {getStartRoadTime() > 0 &&
                    <RoadEndTimeContainer animDelay={1} textInfo={'Road will Start:'} time={getStartRoadTime()} callbackTimer={loadRoad} />
                }
            </DefaultBG>
        </Container>
    )
}

const Container = styled.View`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`
const Dicy = styled.Image`
  width: 220px;
  height: 220px;
`

export default EmptyRoadContainer;