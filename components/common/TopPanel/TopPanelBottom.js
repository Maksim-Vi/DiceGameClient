import React from 'react';
import styled from "styled-components";
import RoadButton from './components/Bottom/RoadButton';
import UserInfo from "./components/Bottom/UserInfo";
import SlideScreen from "../AnimationScreens/SlideScreen";
import SevenDaysGiftButton from "./components/Bottom/SevenDaysGiftButton";
import {useSelector} from "react-redux";
import {selectIsFinishedSevenDays} from "../../redux/reducers/gifts/GiftsReducer";
import {selectDefaultParams} from "../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../redux/reducers/language/defaultParams";

const TopPanelBottom = (props) => {

    const isFinishedSevenDayGifts = useSelector(selectIsFinishedSevenDays)
    const ENABLE_ROAD = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_ROAD))
    const ENABLE_SEVEN_DAYS_GIFT = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_SEVEN_DAYS_GIFT))

    return (
        <PanelBottom>
            <UserInfo userData={props.userData}/>

            <PanelEndContainer>
                <SlideScreen left={false}>
                    {ENABLE_ROAD && <RoadButton />}
                    {ENABLE_SEVEN_DAYS_GIFT && !isFinishedSevenDayGifts && <SevenDaysGiftButton/>}
                </SlideScreen>
            </PanelEndContainer>
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
`
export default TopPanelBottom;