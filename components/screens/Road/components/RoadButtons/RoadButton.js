import React from 'react';
import locked from "../../../../../assets/road/locked.png";
import claimed from "../../../../../assets/road/claimed.png";
import ready from "../../../../../assets/road/ready.png";
import styled from "styled-components";
import C_CLAIM_MISSION from "../../../../protocol/messages/clients/road/C_CLAIM_MISSION";

const RoadButton = (props) => {
  const {isAvailableExecute,isFinished,isClaimed} = props.mission

  const getButtonByType = () =>{
    if(isClaimed)
      return <ClaimedImg source={claimed} resizeMode={ 'stretch'}/>
    if(isFinished && !isClaimed)
      return <ReadyImg source={ready} resizeMode={ 'stretch'}/>
    if(!isAvailableExecute && !isFinished && !isClaimed)
      return <LockedImg style={{opacity: 0.6}} source={locked} resizeMode={ 'stretch'}/>

    return <LockedImg source={locked} resizeMode={ 'stretch'}/>
  }

  const clickHandler = () =>{
    if(isFinished && !isClaimed){
      new C_CLAIM_MISSION(props.mission.missionNumber)
    }
  }

  return (
      <RoadButtonContainer onPress={clickHandler}
                           activeOpacity={0.9}>
          {getButtonByType()}
      </RoadButtonContainer>
  )
};

const RoadButtonContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
`
const LockedImg = styled.Image`
    width: 50px;
    height: 50px;
`
const ReadyImg = styled.Image`
    width: 50px;
    height: 50px;
`
const ClaimedImg = styled.Image`
    width: 50px;
    height: 50px;
`

export default RoadButton;