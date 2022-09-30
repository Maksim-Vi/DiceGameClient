import React from "react";
import Text from "../../../Text/Text";
import styled from "styled-components";

const Experience = (props) =>{
    return <ExperienceContainer>
        {/*<StarsImage source={star} />*/}
        <Text blod medium color={'rgb(255,157,77)'}>Lvl:</Text>
        <Text blod medium>{props.experience ? props.experience.lvl : 0}</Text>
    </ExperienceContainer>
}

const ExperienceContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  white-space: nowrap;
  position: relative;
`

const StarsImage = styled.Image`
  position: absolute;
  width: 30px;
  height: 30px;
`

export default Experience