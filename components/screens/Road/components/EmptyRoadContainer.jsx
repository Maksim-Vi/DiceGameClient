import React from 'react';
import styled from "styled-components";
import DefaultBG from "../../../common/ModalWindows/ModalBackgrounds/DefaultBG";
import {useWindowDimensions} from "react-native";
import {useSelector} from "react-redux";
import {selectStartRoadTime} from "../../../redux/reducers/road/RoadReducer";
import {selectDefaultParams, selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import DefaultParams from "../../../redux/reducers/language/defaultParams";
import RoadEndTimeContainer from "./RoadTimeContainer/RoadEndTimeContainer";
import Text from "../../../common/Text/Text";
import dicy from "../../../../assets/tutorial/dicy_3.png";
import C_GET_MISSION_ROAD_MAP from "../../../protocol/messages/clients/road/C_GET_MISSION_ROAD_MAP";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import moment from 'moment'

const EmptyRoadContainer = (props) => {

    const {width, height} = useWindowDimensions()
    const startRoadTime = useSelector(selectStartRoadTime);
    const startRoadTimeParam = useSelector(state => selectDefaultParams(state, DefaultParams.ROAD_START_TIME));

    const TR_ROAD_WILL_START_TITLE = useSelector(state => selectTranslation(state, defaultTranslation.TR_ROAD_WILL_START_TITLE));
    const TR_ROAD_WILL_START_TEXT = useSelector(state => selectTranslation(state, defaultTranslation.TR_ROAD_WILL_START_TEXT));
    const TR_ROAD_WILL_START = useSelector(state => selectTranslation(state, defaultTranslation.TR_ROAD_WILL_START));

    const getStartRoadTime = () => {
        let thisMoment = moment().utcOffset('+0300').format('YYYY-MM-DD HH:mm:ss')
        const currentTime = Date.parse(thisMoment)
        const roadTimeParam = Date.parse(startRoadTimeParam)

        if(+startRoadTime > 0){
            if((+startRoadTime - +currentTime) > 0){
                return +startRoadTime + 5000
            }
        }

        if(typeof +roadTimeParam === 'number' && +roadTimeParam > 0){
            if((+roadTimeParam - +currentTime) > 0){
                return +roadTimeParam + 5000
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
                <Text setShadow blod large>{TR_ROAD_WILL_START_TITLE}</Text>
                <Text setShadow blod medium>{TR_ROAD_WILL_START_TEXT}</Text>
                <Dicy source={dicy} resizeMode={'contain'}/>
                {getStartRoadTime() > 0 &&
                    <RoadEndTimeContainer animDelay={1}
                                          renderType={'renderCenter'}
                                          textInfo={TR_ROAD_WILL_START} 
                                          time={getStartRoadTime()} 
                                          callbackTimer={loadRoad} />
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