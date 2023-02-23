import React, {useEffect, useState} from 'react';
import ButtonBack from "../../../../common/Buttons/Back/ButtonBack";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {transitionState} from "../../../../utils/utils";
import {setRewardsPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {connect, useDispatch} from "react-redux";
import styled from "styled-components";
import BackgroundTabs from "./components/Backgrounds/BackgroundTabs";
import BackgroundTitle from "./components/Backgrounds/BackgroundTitle";
import {selectIsFinishedSevenDays, selectSevenDaysGifts} from "../../../../redux/reducers/gifts/GiftsReducer";
import {selectDefaultParams, selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import RewardSevenDays from "./SevenDays/RewardSevenDays";
import RewardTabs from "./components/Tabs/RewardTabs";
import {store} from "../../../../redux/redux-store";
import defaultParams from "../../../../redux/reducers/language/defaultParams";
import Text from "../../../../common/Text/Text";
import SlideScreen from "../../../../common/AnimationScreens/SlideScreen";

const RewardsPopup = props => {

    const dispatch = useDispatch()
    const [tab, setTab] = useState('')

    const getTitleByType = () =>{
        switch (tab) {
            case 'sevenDays': return <BackgroundTitle title={props.dailyTitle}/>
            case 'def': return <BackgroundTitle title={'def'}/>
            default: return null
        }
    }

    const changeTab = (tabName) =>{
        setTab(tabName)
    }

    const getContentByType = () =>{
        switch (tab) {
            case 'sevenDays': return <RewardSevenDays />
            case 'def': return <SlideScreen left={true}><Text>def</Text></SlideScreen>
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
        <ModalWrapper modalBG={'bg_black'} modalVisible={true} >
            <ButtonBack leaveGame={leave} colorIcon={'#fefefe'}/>

            <RewardsContainer>
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
  justify-content: flex-start;
  margin-top: 50%;
  width: 100%;
  height: 100%;
`
const mapStateToProps = (state) => ({
    ENABLE_SEVEN_DAYS_GIFT: selectDefaultParams(state, defaultParams.ENABLE_SEVEN_DAYS_GIFT),
    isFinished: selectIsFinishedSevenDays(state),
    dailyTitle: selectTranslation(state,'TR_DAILY_TITLE'),
    dailyDesc: selectTranslation(state,'TR_DAILY_DESC'),
});

export default connect(mapStateToProps)(RewardsPopup);