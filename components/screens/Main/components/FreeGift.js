import React, {useEffect, useRef, useState} from 'react';
import ButtonImage from "../../../common/Buttons/ButtonImage";
import freeCoins from "../../../../assets/shop/profits.png";
import styled from "styled-components";
import {Animated, Easing, Platform} from "react-native";
import {setTimingAnimated} from "../../../utils/Animation";
import {
    TestIds,
    useRewardedInterstitialAd,
} from "react-native-google-mobile-ads";
import {getCoinsBonus} from "../../../protocol/API/API";
import {store} from "../../../redux/redux-store";
import {updateCurrentUserCoins} from "../../../redux/reducers/players/PlayersReducer";
import {APP_TYPE} from '@env'
import {useDispatch, useSelector} from "react-redux";
import {setLeftTimeShowAd} from "../../../redux/reducers/AD/AdvertisingReducer";
import Timer from "../../../common/Timer/Timer";
import Text from "../../../common/Text/Text";
import GiftTimer from "./Gift/GiftTimer";


const timeToWait = 660
const AdUnitID = Platform.OS === 'ios'
    ?  APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/8219230470' : TestIds.GAM_REWARDED_INTERSTITIAL
    : APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/7194208820' : TestIds.GAM_REWARDED_INTERSTITIAL

const FreeGift = (props) => {

    const dispatch = useDispatch()
    const leftTimeShowGiftAd = useSelector(state => state.advertising.leftTimeShowGiftAd)
    const animatedValue = React.useRef(new Animated.Value(1)).current;
    const { isLoaded, isClosed, load, show, isEarnedReward } =  useRewardedInterstitialAd(AdUnitID, {
        requestNonPersonalizedAdsOnly: true,
    })
    const [timeData, setTimeData] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalTime: 0
    })

    const updateTimeData = (data) =>{
        if(data.hours === 0 && data.minutes === 0 && data.seconds === 0){
            load()
            animate()
            dispatch(setLeftTimeShowAd(-1))
        }

        setTimeData(data)
    }

    let timer = new Timer(updateTimeData)

    const animate = () => {
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(animatedValue, 1.1, 1500, Easing.ease, true),
                setTimingAnimated(animatedValue, 1, 1500, Easing.ease, true),
            ]),
        ).start()
    }

    const admodHendler = () =>{
        if(isLoaded && leftTimeShowGiftAd && leftTimeShowGiftAd <= 0){
            show()
        }
    }

    const getBonusByView = async () =>{
        if (isClosed && isEarnedReward) {
            const getBonusCoins = await getCoinsBonus(props.myUser.username)

            if(getBonusCoins && getBonusCoins.success){
                store.dispatch(updateCurrentUserCoins(getBonusCoins.updatedCoins))
            }

            animatedValue.stopAnimation()

            const calcTime = Math.floor(new Date() / 1000) + timeToWait
            timer.start(calcTime)
            dispatch(setLeftTimeShowAd(calcTime))
        } else if(isClosed && !isEarnedReward){
            load()
        }
    }

    useEffect(()=>{
        if(leftTimeShowGiftAd && leftTimeShowGiftAd <= 0){
            load()
        }
    },[load])

    useEffect(()=>{
        timer.stop()

        if(leftTimeShowGiftAd && leftTimeShowGiftAd > 0){
            const calcTime = leftTimeShowGiftAd - Math.floor(new Date() / 1000)
            timer.start(calcTime)
        }

        return ()=>{
            if(timeData.hours > 0 || timeData.minutes > 0 || timeData.seconds > 0){
                timer.stop()
                timer = null
                const calcTime = Math.floor(new Date() / 1000) + timeData.totalTime
                dispatch(setLeftTimeShowAd(calcTime))
            }
        }
    },[])

    useEffect(() => {
        getBonusByView()
    }, [isClosed]);


    useEffect(()=>{
        animate()

        return ()=>{
            animatedValue.stopAnimation()
        }
    },[])

    //if(!isLoaded) return null

    return (
        <FreeCoinsContainer style={{
            transform: [
                {
                    scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            ]
        }}>
            <ButtonImage width={50} height={50} image={freeCoins} clickHandler={()=> admodHendler()}/>
            {timeData && (timeData.hours > 0 || timeData.minutes > 0 || timeData.seconds > 0) &&
                <GiftTimer timeData={timeData}/>
            }
        </FreeCoinsContainer>
    )
}


const FreeCoinsContainer = styled(Animated.View)`
  align-items: center;
  position: absolute;
  bottom: 15%;
  right: 5%;
`

export default FreeGift;