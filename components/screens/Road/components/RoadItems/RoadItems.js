import React from 'react';
import styled from "styled-components";
import { roadMap } from '../utils';
import RoadItem from './RoadItem';

const RoadItems = (props) => {
  return (
      <RoadItemsContainer>
            {roadMap.map((map, index)=>{
                return <RoadItem key={index}
                                 top={map.pos.top}
                                 left={map.pos.left} 
                                 type={map.type}
                                 price={map.price}
                                 rewardType={map.rewardType}/>
            })}
      </RoadItemsContainer>
  )
};

const RoadItemsContainer = styled.TouchableOpacity`
    position: relative;
    display: flex;
    flex: 1;
    width: 100%;
`

export default RoadItems;