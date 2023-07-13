import React, {memo, useEffect, useState} from 'react';
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper';
import mainBg from '../../../assets/road/road_bg.jpeg'
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import RoadContainer from './components/RoadContainer';
import {Platform} from "react-native";
import {getIosModel, transitionState} from "../../utils/utils";
import {useSelector} from "react-redux";
import {selectEndRoadTime, selectStartRoadTime} from "../../redux/reducers/road/RoadReducer";
import {selectDefaultParams} from "../../redux/reducers/language/LanguageReducer";
import DefaultParams from "../../redux/reducers/language/defaultParams";
import EmptyRoadContainer from "./components/EmptyRoadContainer";
import moment from "moment/moment";
import C_GET_MISSION_ROAD_MAP from "../../protocol/messages/clients/road/C_GET_MISSION_ROAD_MAP";

const RoadScreen = memo((props) => {

    const startRoadTime = useSelector(selectStartRoadTime);
    const endRoadTime = useSelector(selectEndRoadTime);
    const startRoadTimeParam = useSelector(state => selectDefaultParams(state, DefaultParams.ROAD_START_TIME));

    const [isStartedRoad, setIsStarted] = useState(false)

    const isIos = getIosModel()

    const checkIsStartedRoad = () =>{
        let thisMoment = moment().utcOffset('+0300').format('YYYY-MM-DD HH:mm:ss')
        const currentTime = Date.parse(thisMoment)
        const roadTimeParam = Date.parse(startRoadTimeParam)

        if(typeof +roadTimeParam === 'number' && +roadTimeParam > 0){
            if((+roadTimeParam - +currentTime) > 0){
                setIsStarted(false)
                return false
            }
        }

        if(+startRoadTime > 0){
            if((+startRoadTime - +currentTime) > 0){
                setIsStarted(false)
                return false
            }
        }
        const isRoadEndTime = +endRoadTime - +currentTime

        if(+endRoadTime && +endRoadTime <= 0 && isRoadEndTime > 0){
            if((+endRoadTime - +currentTime) <= 0){
                new C_GET_MISSION_ROAD_MAP()

                setIsStarted(false)
                return false
            }
        }

        if(isRoadEndTime <= 0){
            setIsStarted(false)
            return false
        }

        setIsStarted(true)
        return true
    }

    const goHome = () =>{
        transitionState('MainScreen')
    }

    useEffect(()=>{
        checkIsStartedRoad();
    }, [startRoadTime, endRoadTime])

    return (
        <BackgroundWrapper gackground={mainBg}>
            <ButtonBack top={Platform.OS === 'ios' && isIos >= 10 ? '7%' : '3%'}
                        left={'1%'}
                        leaveGame={goHome}/>

            {isStartedRoad
                ? <RoadContainer />
                : <EmptyRoadContainer />
            }
        </BackgroundWrapper>
    );
})

export default RoadScreen;