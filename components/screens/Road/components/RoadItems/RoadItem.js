import React, {useEffect} from 'react';
import styled from "styled-components";
import RoadButton from '../RoadButtons/RoadButton';
import RoadItemInfo from './RoadItemInfo';
import {Animated, Easing} from "react-native";

const RoadItem = (props) => {

    const showPlace = React.useRef(new Animated.Value(0))

    const showPlaceAnim = () => {
        Animated.timing(showPlace.current, {
            toValue: 1,
            duration: props.delay + 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        showPlaceAnim()
    }, [])


    if(!props.mission) return

    return (
        <RoadItemContainer {...props}
                           activeOpacity={0.9}
                           style={{
                               opacity: showPlace.current.interpolate({
                                   inputRange: [0, 1],
                                   outputRange: [0, 1],
                               }),
                               transform: [
                                   {
                                       scale: showPlace.current.interpolate({
                                           inputRange: [0, 1],
                                           outputRange: [0, 1]
                                       })
                                   }
                               ]
                           }}
        >
            <RoadItemInfo isClaimed={props.mission.isClaimed}
                          rewardType={props.mission.rewardType}
                          isAvailableExecute={props.mission.isAvailableExecute}
                          isFinished={props.mission.isFinished}
                          rewardQuantity={props.mission.rewardQuantity} />
            <RoadButton mission={props.mission}/>
        </RoadItemContainer>
    )
};

const RoadItemContainer = styled(Animated.View)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    ${(props)=>{
        return `
            top: ${props.top}px;
            left: ${props.left}px;
        `
    }}
`

export default RoadItem;