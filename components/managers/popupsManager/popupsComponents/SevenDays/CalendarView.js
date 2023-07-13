import React, {useEffect} from 'react';
import styled from "styled-components";
import {Animated, Easing} from "react-native";
import calendar from "../../../../../assets/Gifts/calendar.png";
import mark from "../../../../../assets/topPanel/settingsPopup/check.png";
import {setTimingAnimated} from "../../../../utils/Animation";

const CalendarView = (props) => {

    const calendarValue = React.useRef(new Animated.Value(0)).current;

    const setCalendarStartAnim = () =>{
        Animated.sequence([
            setTimingAnimated(calendarValue, 0, 300, Easing.ease, false),
            setTimingAnimated(calendarValue, 1, 300, Easing.ease, false),
            setTimingAnimated(calendarValue, 0.9, 300, Easing.ease, false),
        ]).start();
    }

    useEffect(()=>{
        setCalendarStartAnim()
    },[])

    return (
        <CalenderContainer style={{
            transform: [
                {rotate: '15deg'},
                {scale: calendarValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })}
            ]
        }}>
            <CalendarImage source={calendar}  resizeMode={"contain"}/>
            <CheckMarkImage source={mark}  resizeMode={"contain"}/>
        </CalenderContainer>
    )
}
const CalenderContainer = styled(Animated.View)`
  position: absolute;
  bottom: 7px;
  right: 7px;
`

const CalendarImage = styled.Image`
  width: 30px;
  height: 30px;
`

const CheckMarkImage = styled.Image`
  position: absolute;
  width: 30px;
  height: 30px;
`
export default CalendarView;