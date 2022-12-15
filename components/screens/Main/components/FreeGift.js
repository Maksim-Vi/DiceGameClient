import React, {useEffect, useState} from 'react';
import ButtonImage from "../../../common/Buttons/ButtonImage";
import freeCoins from "../../../../assets/shop/profits.png";
import styled from "styled-components";
import {Animated, Easing, Platform} from "react-native";
import {setTimingAnimated} from "../../../utils/Animation";
import {RewardedAdEventType, RewardedInterstitialAd, TestIds} from "react-native-google-mobile-ads";
import Constants from "expo-constants";
import {getCoinsBonus} from "../../../protocol/API/API";
import {store} from "../../../redux/redux-store";
import {updateCurrentUserCoins} from "../../../redux/reducers/players/PlayersReducer";
const { APP_TYPE } = Constants.manifest?.extra;

const AdUnitID = Platform.OS === 'ios'
    ?  APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/8219230470' : TestIds.REWARDED_INTERSTITIAL
    : APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/7194208820' : TestIds.REWARDED_INTERSTITIAL

const internal = RewardedInterstitialAd.createForAdRequest(AdUnitID,{
    requestNonPersonalizedAdsOnly: true
})

const FreeGift = (props) => {

    const [loadInternal, setLadInternal] = useState(false)
    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const animate = () => {
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(animatedValue, 1.1, 1500, Easing.ease, true),
                setTimingAnimated(animatedValue, 1, 1500, Easing.ease, true),
            ]),
        ).start()
    }

    const loadReclam = () =>{

        internal.load()

        const unsubscribeLoaded = internal.addAdEventListener(RewardedAdEventType.LOADED,(data)=>{
            setLadInternal(true)
        })

        const unsubscribeClosed = internal.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async (data)=>{
            const getBonusCoins = await getCoinsBonus(props.myUser.username)

            if(getBonusCoins && getBonusCoins.success){
                store.dispatch(updateCurrentUserCoins(getBonusCoins.updatedCoins))
                setLadInternal(false)
            }

            setTimeout(()=>{
                internal.load()
            },5000)
        })

        return () => {
            unsubscribeLoaded()
            unsubscribeClosed()
        }
    }

    const admodHendler = () =>{
        if(loadInternal && internal.loaded){
            internal.show()
        }
    }

    useEffect(() => {
        if(internal.loaded){
            setLadInternal(true)
        }
    }, [internal.loaded]);


    useEffect(()=>{
        animate()

        internal.load()
        const unsubscribeInternalEvents = loadReclam()

        if(internal.loaded){
            setLadInternal(true)
        }

        return ()=>{
            unsubscribeInternalEvents()
            animatedValue.stopAnimation()
        }
    },[])


    if(!loadInternal && !internal.loaded) return null

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
        </FreeCoinsContainer>
    )
}

const FreeCoinsContainer = styled(Animated.View)`
  position: absolute;
  bottom: 15%;
  right: 5%;
`

export default FreeGift;