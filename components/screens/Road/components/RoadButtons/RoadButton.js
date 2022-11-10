import React from 'react';
import locked from "../../../../../assets/road/locked.png";
import claimed from "../../../../../assets/road/claimed.png";
import ready from "../../../../../assets/road/ready.png";
import styled from "styled-components";
import { typesRoadBtns } from '../utils';

const RoadButton = (props) => {

  const getButtonByType = () =>{
    switch (props.type) {
      case typesRoadBtns.locked: return <LockedImg source={locked} resizeMode={ 'stretch'}/>
      case typesRoadBtns.ready: return <ReadyImg source={ready} resizeMode={ 'stretch'}/>
      case typesRoadBtns.claimed: return <ClaimedImg source={claimed} resizeMode={ 'stretch'}/>
      default:
          break;
  }
  }

  return (
      <RoadButtonContainer activeOpacity={0.9}>
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