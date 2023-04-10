import React, {useEffect, useState} from 'react';
import ButtonBack from "../../../../common/Buttons/Back/ButtonBack";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {transitionState} from "../../../../utils/utils";
import {setRewardsPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {connect, useDispatch} from "react-redux";
import styled from "styled-components";
import BackgroundTabs from "./components/Backgrounds/BackgroundTabs";
import BackgroundTitle from "./components/Backgrounds/BackgroundTitle";
import {selectIsFinishedSevenDays} from "../../../../redux/reducers/gifts/GiftsReducer";
import {selectDefaultParams, selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import RewardSevenDays from "./SevenDays/RewardSevenDays";
import RewardTabs from "./components/Tabs/RewardTabs";
import defaultParams from "../../../../redux/reducers/language/defaultParams";
import DailyRewards from "./DailyRewards/DailyRewards";
import {useWindowDimensions} from "react-native";
import back from "../../../../../assets/common/btns/button_page_back.png";
import Sounds, {soundsType} from "../../../../utils/Sounds";

const RewardsPopup = props => {

    const dispatch = useDispatch()
    const {width,height} = useWindowDimensions()
    const [tab, setTab] = useState('sevenDays')

    const getTitleByType = () =>{
        switch (tab) {
            case 'sevenDays': return <BackgroundTitle title={props.dailyTitle}/>
            case 'DailyRewards': return <BackgroundTitle title={'Daily Rewards'}/>
            default: return null
        }
    }

    const changeTab = (tabName) =>{
        setTab(tabName)
    }

    const getContentByType = () =>{
        switch (tab) {
            case 'sevenDays': return <RewardSevenDays isFinished={props.isFinished}/>
            case 'DailyRewards': return <DailyRewards />
            default: return null
        }
    }

    const leave = () =>{
        transitionState('MainScreen')
        dispatch(setRewardsPopup({visible: false, data: null}))
    }

    useEffect(()=>{
        if(props.ENABLE_SEVEN_DAYS_GIFT && !props.isFinished){
            setTab('sevenDays')
        }
    },[])

    return (
        <ModalWrapper modalBG={'bg_black_rewards'} modalVisible={true} lineArrow setModalVisible={leave}>
            <RewardsContainer height={height}>

                <RewardTabs tab={tab} changeTab={changeTab}/>
                <BackgroundTabs>
                    {getTitleByType()}
                </BackgroundTabs>

                {getContentByType()}

            </RewardsContainer>
        </ModalWrapper>
    );
};

const RewardsContainer = styled.View`
    display: flex;
  align-items: center;
  justify-content: center;
  margin-top:${(props)=> props.height < 700 ? `20px` : '30%'};
  height: ${(props)=> props.height ? `${props.height}px` : '100%'};
`

const mapStateToProps = (state) => ({
    ENABLE_SEVEN_DAYS_GIFT: selectDefaultParams(state, defaultParams.ENABLE_SEVEN_DAYS_GIFT),
    isFinished: selectIsFinishedSevenDays(state),
    dailyTitle: selectTranslation(state,'TR_DAILY_TITLE'),
    dailyDesc: selectTranslation(state,'TR_DAILY_DESC'),
});

export default connect(mapStateToProps)(RewardsPopup);