import React, {useEffect} from 'react';
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper';
import mainBg from '../../../assets/road/road_bg.jpeg'
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import RoadContainer from './components/RoadContainer';
import {Platform} from "react-native";
import {getIosModel} from "../../utils/utils";
import {useSelector} from "react-redux";
import {selectEndRoadTime, selectStartRoadTime} from "../../redux/reducers/road/RoadReducer";
import {selectDefaultParams} from "../../redux/reducers/language/LanguageReducer";
import DefaultParams from "../../redux/reducers/language/defaultParams";
import EmptyRoadContainer from "./components/EmptyRoadContainer";

const RoadScreen = (props) => {

    const startRoadTime = useSelector(selectStartRoadTime);
    const endRoadTime = useSelector(selectEndRoadTime);
    const startRoadTimeParam = useSelector(state => selectDefaultParams(state, DefaultParams.ROAD_START_TIME));

    const isIos = getIosModel()


    const checkIsStartedRoad = () =>{
        const currentTime = Date.now()
        const roadTimeParam = Date.parse(startRoadTimeParam)

        if(+startRoadTime > 0){
            if((+startRoadTime - currentTime) > 0){
                return false
            }
        }

        if(typeof +roadTimeParam === 'number' && +roadTimeParam > 0){
            if((roadTimeParam - currentTime) > 0){
                return false
            }
        }

        if(endRoadTime && endRoadTime <= 0){
            if((endRoadTime - currentTime) <= 0){
                return false
            }
        }

        return true
    }

    useEffect(()=>{
        checkIsStartedRoad();
    }, [startRoadTime, endRoadTime])

    return (
        <BackgroundWrapper gackground={mainBg}>
            <ButtonBack top={Platform.OS === 'ios' && isIos >= 10 ? '7%' : '3%'}
                        left={'1%'}
                        goMainPage={true}/>

            {checkIsStartedRoad()
                ? <RoadContainer />
                : <EmptyRoadContainer />
            }
        </BackgroundWrapper>
    );
};

export default RoadScreen;