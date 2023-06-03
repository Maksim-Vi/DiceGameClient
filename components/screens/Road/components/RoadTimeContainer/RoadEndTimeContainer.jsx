import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import Timer from "../../../../common/Timer/Timer";
import clock from "../../../../../assets/road/alarm-clock.png";
import {Animated, Easing, Platform} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";
import {getIosModel} from "../../../../utils/utils";

const RoadEndTimeContainer = (props) => {

    const show = React.useRef(new Animated.Value(0))
    const [timeData, setTimeData] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalTime: 0
    })

    const style = {
        opacity: show.current.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
        transform: [{ scale: show.current.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) } ]
    }

    const updateTimeData = (data) =>{
        if(data.hours === 0 && data.minutes === 0 && data.seconds === 0){
            timer.stop()
            if(props.callbackTimer){
                props.callbackTimer();
            }
        }

        setTimeData(data)
    }

    let timer = new Timer(updateTimeData, true)

    const getTimeFormatter = () =>{
        let time = '00:00'

        if(timeData.days > 0){
            const hours = timeData.hours < 10 ? '0' + timeData.hours : timeData.hours

            return `${timeData.days}D : ${hours}h`
        } else if(timeData.hours > 0){
            const hours = timeData.hours < 10 ? '0' + timeData.hours : timeData.hours
            const minutes = timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes

            return `${hours}h : ${minutes}m`
        } else if(timeData.minutes > 0){
            const minutes = timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes
            const seconds = timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds

            return `${minutes}m : ${seconds}s`
        } else if(timeData.seconds > 0){
            const seconds = timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds

            return `00m : ${seconds}s`
        }

        return time
    }

    const showPlaceAnim = () => {
        Animated.sequence([
            Animated.delay(props.animDelay || 700),
            setTimingAnimated(show.current, 1.05, 800, Easing.cubic,true),
            setTimingAnimated(show.current, 1, 600, Easing.cubic,true),
        ]).start();

    }

    useEffect(()=>{
        if(props.time > 0){
            timer.stop()
            timer.start(Math.floor(props.time / 1000))
            showPlaceAnim()
        }

        return ()=>{
            timer.stop()
            timer = null
        }
    },[])

    const renderLeft = () =>{
        return (
            <TimeContainerLeft style={style}>
                <ClockImg source={clock} style={{ transform: [{rotate: '-20deg'}]}} resizeMode={'stretch'} />
                <Text setShadow blod madium center>{props.textInfo}</Text>
                <Text setShadow madium>{getTimeFormatter()}</Text>
            </TimeContainerLeft>
        )
    }

    const renderRight = () =>{
        return (
            <TimeContainerRight style={style}>
                <ClockImg source={clock} style={{ transform: [{rotate: '-20deg'}]}} resizeMode={'stretch'} />
                <Text setShadow blod madium center>{props.textInfo}</Text>
                <Text setShadow madium>{getTimeFormatter()}</Text>
            </TimeContainerRight>
        )
    }

    const renderCenter = () =>{
        return (
            <TimeContainerCenter style={style}>
                <ClockImg source={clock} style={{ transform: [{rotate: '-20deg'}]}} resizeMode={'stretch'} />
                <Text setShadow blod madium center>{props.textInfo}</Text>
                <Text setShadow madium>{getTimeFormatter()}</Text>
            </TimeContainerCenter>
        )
    }

    const getRenderByType = () =>{
        switch (props.renderType){
            case 'renderLeft': return renderLeft()
            case 'renderRight': return renderRight()
            case 'renderCenter': return renderCenter()
            default: return renderLeft()
        }
    }

    return getRenderByType()
}

const TimeContainerLeft = styled(Animated.View)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: 10px;
  width: 30%;
  height: 55px;
  background-color: rgba(0, 0, 0, 0.64);
  border-radius: 10px;
  border: 3px solid rgba(0, 0, 0, 0.49);
  
  ${()=>{
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
      return `
        margin-bottom: 40px;
      `
    } else if(Platform.OS === 'ios' && isIos < 10){
      return `
        margin-bottom: 10px;
      `
    } else {
      return `
        margin-bottom: 30px;
      `
    }
  }}
`

const TimeContainerRight = styled(Animated.View)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: auto;
  width: 30%;
  height: 55px;
  background-color: rgba(0, 0, 0, 0.64);
  border-radius: 10px;
  border: 3px solid rgba(0, 0, 0, 0.49);
  
  ${()=>{
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
      return `
        margin-bottom: 40px;
      `
    } else if(Platform.OS === 'ios' && isIos < 10){
      return `
        margin-bottom: 10px;
      `
    } else {
      return `
        margin-bottom: 30px;
      `
    }
  }}
`

const TimeContainerCenter = styled(Animated.View)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 55px;
  background-color: rgba(0, 0, 0, 0.64);
  border-radius: 10px;
  border: 3px solid rgba(0, 0, 0, 0.49);
  ${()=>{
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
      return `
        margin-bottom: 40px;
      `
    } else if(Platform.OS === 'ios' && isIos < 10){
      return `
        margin-bottom: 10px;
      `
    } else {
      return `
        margin-bottom: 30px;
      `
    }
  }}
`

const ClockImg = styled.Image`
  position: absolute;
  display: flex;
  left: -30px;
  width: 40px;
  height: 40px;
`

export default RoadEndTimeContainer;