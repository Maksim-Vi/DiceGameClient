import React, {useEffect, useState} from 'react';
import ButtonImage from "../../../common/Buttons/ButtonImage";
import freeCoins from "../../../../assets/shop/profits.png";
import styled from "styled-components";
import {Animated, Easing, Platform} from "react-native";
import {setTimingAnimated} from "../../../utils/Animation";
import {
    TestIds,
    useRewardedInterstitialAd,
} from "react-native-google-mobile-ads";
import {store} from "../../../redux/redux-store";
import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";
import {useDispatch, useSelector} from "react-redux";
import {selectLeftTimeShowGiftAd, setLeftTimeShowAd} from "../../../redux/reducers/AD/AdvertisingReducer";
import Timer from "../../../common/Timer/Timer";
import GiftTimer from "./Gift/GiftTimer";
import SlideScreen from "../../../common/AnimationScreens/SlideScreen";
import AnimatedLottieView from "lottie-react-native";
import coins from '../../../../assets/animation/lottieAnim/coins-drop.json'
import Sounds, {soundsType} from "../../../utils/Sounds";
import {selectDefaultParams, selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../redux/reducers/language/defaultParams";
import {setInfoPopup} from "../../../redux/reducers/popups/PopupsReducer";
import btmBG from '../../../../assets/common/btns/circleBtn.png'
import Text from "../../../common/Text/Text";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import {selectActiveTabApp} from "../../../redux/reducers/Websocket/WebsocketReducer";

const FreeGift = (props) => {

    const user = useSelector(selectMyUser)
    const changeTabs = useSelector(selectActiveTabApp)
    const ENABLE_AD_PROD = useSelector(state=> selectDefaultParams(state, defaultParams.ENABLE_AD_PROD))
    const TR_FREE_COINS_TIMER_INFO = useSelector(state=> selectTranslation(state, defaultTranslation.TR_FREE_COINS_TIMER_INFO))
    const TR_FREE_COINS_EMPTY_LOAD_INFO = useSelector(state=> selectTranslation(state, defaultTranslation.TR_FREE_COINS_EMPTY_LOAD_INFO))
    const ENABLE_AD_IOS_PROD = useSelector(state=> selectDefaultParams(state, defaultParams.ENABLE_AD_IOS_PROD))
    const ENABLE_AD_ANDROID_PROD = useSelector(state=> selectDefaultParams(state, defaultParams.ENABLE_AD_ANDROID_PROD))
    const freeCoinsText = useSelector(state=> selectTranslation(state, defaultTranslation.TR_FREE_COINS))

    const AdUnitID = Platform.OS === 'ios'
        ? process.env.APP_TYPE !== 'development' && ENABLE_AD_PROD && ENABLE_AD_IOS_PROD ? 'ca-app-pub-6421975370931679/8219230470' : TestIds.REWARDED_INTERSTITIAL
        : process.env.APP_TYPE !== 'development' && ENABLE_AD_PROD && ENABLE_AD_ANDROID_PROD ? 'ca-app-pub-6421975370931679/7194208820' : TestIds.REWARDED_INTERSTITIAL

    const dispatch = useDispatch()
    const leftTimeShowGiftAd = selectLeftTimeShowGiftAd(store.getState())
    const animatedValue = React.useRef(new Animated.Value(1)).current;
    const { isLoaded, isClosed, load, show, isEarnedReward, error, isShowing, isClicked, isOpened } = useRewardedInterstitialAd(AdUnitID, {
        requestNonPersonalizedAdsOnly: true,
        serverSideVerificationOptions:{
            userId: String(user.id),
            customData: JSON.stringify({username: user.username, reward: 10, type: 'coins'})
        }
    })
    const [lottieAnim, setLottieAnim] = useState(false)
    const [timeData, setTimeData] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalTime: 0
    })

    const updateTimeData = (data) =>{
        if(data.hours === 0 && data.minutes === 0 && data.seconds === 0){
            if(timer && timer !== null) timer.stop()

            animate()
            setLottieAnim(false)
            dispatch(setLeftTimeShowAd(-1))

            if(!isLoaded) load()
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
        if(isLoaded && leftTimeShowGiftAd <= 0){
            Sounds.loadAndPlayFile(soundsType.click)
            show()
        } else {
            if(!isLoaded && timeData.totalTime <= 0) {
                load()
                if(isLoaded) return show()
            }

            if(!isLoaded && timeData.totalTime <= 0){
                dispatch(setInfoPopup({visible: true, data: {text: TR_FREE_COINS_EMPTY_LOAD_INFO}}))
            } else if(timeData.totalTime > 0){
                dispatch(setInfoPopup({visible: true, data: {text: TR_FREE_COINS_TIMER_INFO}}))
            }
        }
    }

    const getBonusByView = async () =>{
        if (isClosed && isEarnedReward) {
            setTimeout(()=>{
                Sounds.loadAndPlayFile(soundsType.moneyDrop)
                setLottieAnim(true)
            },500)
            animatedValue.stopAnimation()

        } else if(isClosed && !isEarnedReward){
            if(!isLoaded) load()
        }
    }

    useEffect(()=>{
        if(!isLoaded) {
            load()
        }
    },[load, isLoaded, changeTabs])

    useEffect(()=>{
        timer.stop()

        if(leftTimeShowGiftAd > 0){
            timer.start(leftTimeShowGiftAd)
        }

        return ()=>{
            if(timeData.hours > 0 || timeData.minutes > 0 || timeData.seconds > 0){
                timer.stop()
                timer = null
            }
        }
    },[])

    useEffect(()=>{
        if(leftTimeShowGiftAd > 0){
            timer.start(leftTimeShowGiftAd)
        }

    },[load, isLoaded, leftTimeShowGiftAd])


    useEffect(() => {
        getBonusByView()
    }, [isClosed]);

    useEffect(()=>{
        animate()

        return ()=>{
            animatedValue.stopAnimation()
        }
    },[])

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
            <SlideScreen left={false}>
                <Container>
                    <Icon source={btmBG}/>
                    <ButtonImage width={50} height={50} image={freeCoins} clickHandler={()=> admodHendler()}/>
                    <TextContainer>
                        <Text setShadow numberOfLines={1} small center>{freeCoinsText}</Text>
                    </TextContainer>

                </Container>
                <GiftTimerContainer>
                    {timeData && (timeData.hours > 0 || timeData.minutes > 0 || timeData.seconds > 0) &&
                        <GiftTimer timeData={timeData}/>
                    }
                </GiftTimerContainer>

                {lottieAnim &&
                    <AnimatedLottieView source={coins} loop={false} autoPlay
                                        onAnimationFinish={()=>{setLottieAnim(false)}}
                                        style={{position: 'absolute', bottom: 0, right: 0,width: 100, height: 250}} />
                }
            </SlideScreen>
        </FreeCoinsContainer>
    )
}


const FreeCoinsContainer = styled(Animated.View)`
  align-items: center;
  position: absolute;
  bottom: 20%;
  right: 5%;
  z-index: 1;
`

const Container = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TextContainer = styled.View`
  position: absolute;
  bottom: -5%;
`

const GiftTimerContainer = styled.View`
  position: absolute;
  bottom: -30%;
  left: 20%;
`

const Icon = styled.Image`
  position: absolute;
  top: 10px;
  z-index: -1;
  width: 55px;
  height: 55px;
`

export default FreeGift;