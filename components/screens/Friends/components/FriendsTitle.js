import React from 'react';
import bgTitle from "../../../../assets/bg/title_info_text_BG.png";
import Text from "../../../common/Text/Text";
import styled from "styled-components";
import {useWindowDimensions} from "react-native";

const FriendsTitle = (props) => {
    const {width,height} = useWindowDimensions()

    return (
        <Title width={width}>
            <TitleBG source={bgTitle} resizeMode={'stretch'}>
                <Text setShadow={true} large blod center>Friends</Text>
            </TitleBG>
        </Title>
    )
}

const Title = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width:${(props)=> props.width < 400 ? `65%` : '80%'};
  height: 50px;
`

const TitleBG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
export default FriendsTitle;