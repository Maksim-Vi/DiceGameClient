import React from "react";
import Text from "../../../Text/Text";
//import star from '../../../../../assets/common/star.png'
import styled from "styled-components";

const Experience = (props) =>{
    return <ExperienceContainer>
        {/*<StarsImage source={star} />*/}
        <Text setShadow={true} blod medium color={'rgb(255,157,77)'} center>Lvl:</Text>
        <Text setShadow={true} blod medium center>{props.experience ? props.experience.lvl : 0}</Text>
    </ExperienceContainer>
}

const ExperienceContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  white-space: nowrap;
  margin-top: 5px;
  margin-left: -3px;
`

const StarsImage = styled.Image`
  position: absolute;
  width: 30px;
  height: 30px;
`

export default Experience