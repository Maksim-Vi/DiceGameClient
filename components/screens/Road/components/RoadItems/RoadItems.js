import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {roadMap} from '../utils';
import RoadItem from './RoadItem';
import {connect} from "react-redux";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {selectRoadMissions} from "../../../../redux/reducers/road/RoadReducer";

const RoadItems = (props) => {

    const [roadMissions, srtRoadMissions] = useState(null)

    const getRoadMissionByPlace = (index) =>{
        const mission = roadMissions[index]

        if(mission){
            return {
                missionNumber: mission.missionNumber,
                missionName: mission.missionName,
                missionProgress: mission.missionProgress,
                missionFinish: mission.missionFinish,
                isAvailable: mission.isAvailable,
                isAvailableExecute: mission.isAvailableExecute,
                isFinished: mission.isFinished,
                isClaimed: mission.isClaimed,
                rewardQuantity: mission.rewardQuantity,
                rewardType: mission.rewardType,
                startTime: mission.startTime,
                endTime: mission.endTime
            }
        }

        return null
    }

    useEffect(()=>{
        if(props.roadMissions){
            srtRoadMissions(props.roadMissions)
        }
    },[props.roadMissions])

    if(!roadMissions || roadMissions.length === 0) return

    return (
        <RoadItemsContainer>
            {roadMap.map((map, index) => {
                const roadMissionByPlace = getRoadMissionByPlace(index)

                if(!roadMissionByPlace.isAvailable) return

                return <RoadItem key={index}
                                 top={map.pos.top}
                                 left={map.pos.left}
                                 delay={index * 100}
                                 mission={roadMissionByPlace}/>
            })}
        </RoadItemsContainer>
    )
};

const RoadItemsContainer = styled.View`
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
`

const mapStateToProps = (state) => ({
    user: selectMyUser(state),
    roadMissions: selectRoadMissions(state),
})

export default connect(mapStateToProps)(RoadItems);