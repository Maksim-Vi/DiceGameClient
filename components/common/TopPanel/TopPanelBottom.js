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
            <UserInfo userData={props.userData}/>

            <SlideScreen left={false}>
                <PanelEndContainer>
                    {ENABLE_NEWS && <NewsButton />}
                    <RewardsButton />
                    {ENABLE_ROAD && <RoadButton />}
                </PanelEndContainer>
            </SlideScreen>
        </PanelBottom>
    );
};

const PanelBottom = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 98%;
    margin-top: 10px;
    z-index: 1;
`
const PanelEndContainer = styled.View`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  margin: 15px 0;
  width: 100%;
`

export default TopPanelBottom;