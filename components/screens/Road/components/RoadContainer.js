import React from 'react';
import styled from "styled-components";
import RoadItems from './RoadItems/RoadItems';
import RoadInfoMission from "./RoadInfoMission/RoadInfoMission";
import RoadEndTimeContainer from "./RoadTimeContainer/RoadEndTimeContainer";
import {useSelector} from "react-redux";
import {selectEndRoadTime, setEndTimeRoad, setStartTimeRoad} from "../../../redux/reducers/road/RoadReducer";
import {store} from "../../../redux/redux-store";
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";

const RoadContainer = (props) => {

    const endRoadTime = useSelector(state => selectEndRoadTime(state));
    const TR_ROAD_END = useSelector(state => selectTranslation(state, defaultTranslation.TR_ROAD_END));

    const updateDataRoad = () =>{
        store.dispatch(setStartTimeRoad(-1))
        store.dispatch(setEndTimeRoad(-1))
    }

    return (
        <Container>
            <RoadInfoMission />
           <RoadItems />
            {endRoadTime > 0 &&
                <RoadEndTimeContainer animDelay={700}
                                      renderType={'renderLeft'}
                                      textInfo={TR_ROAD_END}
                                      time={endRoadTime || -1}
                                      callbackTimer={updateDataRoad}/>
            }
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