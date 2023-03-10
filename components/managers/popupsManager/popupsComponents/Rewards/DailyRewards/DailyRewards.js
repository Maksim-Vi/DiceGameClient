import React from 'react';
import Text from "../../../../../common/Text/Text";
import SlideScreen from "../../../../../common/AnimationScreens/SlideScreen";
import styled from "styled-components";
import comingSoon from '../../../../../../assets/common/show-dicy.png'

const DailyRewards = (props) => {
    return (
        <SlideScreen left={true}>
            <Container>
                <Text setShadow large blod center>Daily Rewards Coming Soon!</Text>
                <ComingSoon source={comingSoon} resizeMode={'stretch'}/>
            </Container>
        </SlideScreen>
    )
}

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ComingSoon = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`
export default DailyRewards;