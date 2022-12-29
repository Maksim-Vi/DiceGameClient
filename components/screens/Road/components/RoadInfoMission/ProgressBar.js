import React from 'react';
import styled from "styled-components";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";

const ProgressBar = (props) => {
    return (
        <ProgressContainer {...props}>
            <Progress {...props}/>
            <TextCount center>{props.activeMission.missionProgress} / {props.activeMission.missionFinish}</TextCount>
        </ProgressContainer>
    )
}

const ProgressContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 60%;
  height: 60%;
  border-radius: 10px;
  background-color: rgba(82, 77, 73, 0.95);
`

const Progress = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${props => `${props.activeMission.missionProgress / (props.activeMission.missionFinish / 100)}%`};
  height: 100%;
  border-radius: 10px;
  background-color: rgb(132, 171, 62);
`

const TextCount = styled(TextWithoutShadow)`
  position: absolute;
  width: 100%;
`

export default ProgressBar;