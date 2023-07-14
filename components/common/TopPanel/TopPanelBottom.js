import React from 'react';
import styled from "styled-components";
import RoadButton from './components/Bottom/RoadButton';
import UserInfo from "./components/Bottom/UserInfo";
import SlideScreen from "../AnimationScreens/SlideScreen";
import {useSelector} from "react-redux";
import {selectDefaultParams} from "../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../redux/reducers/language/defaultParams";
import RewardsButton from "./components/Bottom/RewardsButton";
import NewsButton from './components/Bottom/NewsButton';

const TopPanelBottom = (props) => {

    const ENABLE_ROAD = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_ROAD))
    const ENABLE_NEWS = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_NEWS))

    return (
        <PanelBottom>
            <AvatarContainer>
                <UserInfo userData={props.userData}/>
            </AvatarContainer>


            <PanelEndContainer>
                {ENABLE_NEWS && <NewsButton />}
                <RewardsButton />
                {ENABLE_ROAD && <RoadButton />}
            </PanelEndContainer>
        </PanelBottom>
    );
};

const PanelBottom = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-top: 10px;
  z-index: 1;
`

const AvatarContainer = styled.View`
  display: flex;
  align-items: flex-start;
  width: 25%;
  height: 100px;
`

const PanelEndContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 70%;
  height: 100px;
`

export default TopPanelBottom;