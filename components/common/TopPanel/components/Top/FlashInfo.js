import React, {useEffect, useState} from 'react';
import infoImg from "../../../../../assets/topPanel/info-flash.png";
import Text from "../../../Text/Text";
import flash from "../../../../../assets/topPanel/flash.png";
import styled from "styled-components";
import {Animated, Easing} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";
import Timer from "../../../Timer/Timer";
import {connect, useDispatch, useSelector} from "react-redux";
import {selectTimerFlash, setTimerFlash} from "../../../../redux/reducers/topPanel/TopPanelReducer";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const showTimer = 180

const FlashInfo = (props) => {

    const timerToShow = useSelector(selectTimerFlash)
    const dispatch = useDispatch()
    const animatedInfoFlash = React.useRef(new Animated.Value(0)).current;
    const [isShow, setShow] = useState(false)

    const updateTimeData = (data) =>{
        if(data.hours === 0 && data.minutes === 0 && data.seconds === 0){
            timer.stop()
            dispatch(setTimerFlash(-1))
            startCountTimer()
        }
    }

    let timer = new Timer(updateTimeData)

    const setShowInfoFlash = () =>{
        setShow(true)
        Animated.sequence([
            setTimingAnimated(animatedInfoFlash, 0, 300, Easing.ease),
            setTimingAnimated(animatedInfoFlash, 1, 300, Easing.ease),
        ]).start((result)=>{
            if(result.finished){
                setTimeout(()=>{
                    setHiddenInfoFlash()
                }, 5000)
            }
        })
    }

    const setHiddenInfoFlash = () =>{
        Animated.sequence([
            setTimingAnimated(animatedInfoFlash, 1, 300, Easing.ease),
            setTimingAnimated(animatedInfoFlash, 0, 300, Easing.ease),
        ]).start((result)=>{
            if(result.finished){
                setShow(false)
            }
        })
    }

    const startCountTimer = () =>{
        if(timerToShow < 0){
            const time = showTimer + Date.now() / 1000

            timer.stop()
            timer.start(Math.floor(+time))

            dispatch(setTimerFlash(+time))
            setShowInfoFlash()
        }
    }



    useEffect(()=>{
        startCountTimer()

        return () => {
            timer.stop()
            setHiddenInfoFlash()
        }
    }, [])

    if(!isShow) return null

    return (
        <Container  style={{
            transform: [
                {
                    scaleY: animatedInfoFlash.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            ]
        }}>
            <InfoContainer source={infoImg}
                           resizeMode={'stretch'}>

                <ContainerText>
                    <Text setShadow blod small center>{props.get}</Text>
                    <Text setShadow blod small center color={'#e1a317'}> 2</Text>
                    <FlashImageInfo source={flash} resizeMode="cover"/>
                </ContainerText>

                <Text setShadow blod small center>{props.everyText} <Text setShadow blod small center color={'#e1a317'}>15min</Text></Text>
            </InfoContainer>
        </Container>

    )
}

const Container = styled(Animated.View)`
  position: absolute;
  right: -10px;
  bottom: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  width: 100px;
  height: 50px;
`

const InfoContainer = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
`

const ContainerText = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const FlashImageInfo = styled.Image`
  width: 20px;
  height: 20px;
`

const mapStateToProps = (state) => ({
    get: selectTranslation(state, defaultTranslation.TR_GET),
    everyText: selectTranslation(state, defaultTranslation.TR_EVERY)
})

export default connect(mapStateToProps)(FlashInfo);