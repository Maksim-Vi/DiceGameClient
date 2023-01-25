import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import DaysCardTitle from "./DaysCardTitle";
import BlackBgCard from "../../../../common/BackgroundWrapper/BlackBGCard";
import {Animated, Easing} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";
import coinsAnim from '../../../../../assets/animation/lottieAnim/coins.json'
import diamondsAnim from '../../../../../assets/animation/lottieAnim/diamond-evaporate.json'
import CalendarView from "./CalendarView";
import C_CLAIM_SEVEN_DAYS_GIFTS from "../../../../protocol/messages/clients/gifts/C_CLAIM_SEVEN_DAYS_GIFTS";
import AnimatedLottieView from "lottie-react-native";
import Sounds, {soundsType} from "../../../../utils/Sounds";

const DaysCard = (props) => {

    const {giftItem: {isAvailableClaim, isClaimed, dayNumber}} = props
    let isDisabled = !isAvailableClaim && !isClaimed

    const [isAnim,setLottie] = useState(false)

    const rotValue = React.useRef(new Animated.Value(0)).current;
    const anim = React.useRef(
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(rotValue, 1, 300, Easing.ease, true),
                setTimingAnimated(rotValue, 2, 300, Easing.ease, true),
                setTimingAnimated(rotValue, 0, 300, Easing.ease, true),
                setTimingAnimated(rotValue, 1, 300, Easing.ease, true),
                setTimingAnimated(rotValue, 2, 300, Easing.ease, true),
                setTimingAnimated(rotValue, 0, 300, Easing.ease, true),
                Animated.delay(2000),
            ])
        )
    )
    const rotate = rotValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0deg', '5deg', '-5deg']
    })


    const claimGift = () => {
        if (isAvailableClaim && !isClaimed) {
            Sounds.loadAndPlayFile(soundsType.moneyDrop2)
            new C_CLAIM_SEVEN_DAYS_GIFTS(dayNumber)
            setLottie(true)
            anim.current.stop()
            rotValue.setValue(0)
        }
    }


    useEffect(() => {
        if (isAvailableClaim && !isClaimed) {
            anim.current.start()
        } else {
            anim.current.stop()
            rotValue.setValue(0)
        }

        return () => {
            anim.current.stop()
            rotValue.setValue(0)
        };
    }, []);

    return (
        <DaysCardContainer activeOpacity={isDisabled || isClaimed ? 1 : 0.9}
                           onPress={claimGift}
                           style={{borderBottomWidth: 5, transform: [{rotate: rotate}]}}>
            <DaysCardTitle title={props.title}/>
            {props.children}

            {isClaimed && <CalendarView/>}
            {isAnim &&
                <AnimatedLottieView loop={false}
                                    autoPlay
                                    source={props.typeReward === 'coins' ? coinsAnim:  diamondsAnim}
                                    style={props.typeReward === 'coins'
                                        ? {position: 'absolute', width: 300, height: 300}
                                        : {position: 'absolute', bottom: 0, width: 500, height: 500}
                }/>
            }
            {isDisabled && <BlackBgCard/>}
        </DaysCardContainer>
    )
}

const DaysCardContainer = styled.TouchableOpacity`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 130px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
`

const CalendarImage = styled(Animated.Image)`
  position: absolute;
  bottom: 7px;
  right: 7px;
  width: 30px;
  height: 30px;
`

export default DaysCard;