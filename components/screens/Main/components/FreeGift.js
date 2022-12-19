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
import {getCoinsBonus} from "../../../protocol/API/API";
import {store} from "../../../redux/redux-store";
import {updateCurrentUserCoins} from "../../../redux/reducers/players/PlayersReducer";
import {APP_TYPE} from '@env'

const AdUnitID = Platform.OS === 'ios'
    ?  APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/8219230470' : TestIds.GAM_REWARDED_INTERSTITIAL
    : APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/7194208820' : TestIds.GAM_REWARDED_INTERSTITIAL

const FreeGift = (props) => {

    const { isLoaded, isClosed, load, show, isEarnedReward } =  useRewardedInterstitialAd(AdUnitID, {
        requestNonPersonalizedAdsOnly: true,
    })

    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const animate = () => {
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(animatedValue, 1.1, 1500, Easing.ease, true),
                setTimingAnimated(animatedValue, 1, 1500, Easing.ease, true),
            ]),
        ).start()
    }

    const admodHendler = () =>{
        if(isLoaded){
            show()
        }
    }

    const getBonusByView = async () =>{
        if (isClosed && isEarnedReward) {
            const getBonusCoins = await getCoinsBonus(props.myUser.username)

            if(getBonusCoins && getBonusCoins.success){
                store.dispatch(updateCurrentUserCoins(getBonusCoins.updatedCoins))
            }

            load()
        }
    }

    useEffect(()=>{
        load()
    },[load])

    useEffect(() => {
        getBonusByView()
    }, [isClosed]);


    useEffect(()=>{
        animate()

        return ()=>{
            animatedValue.stopAnimation()
        }
    },[])

    if(!isLoaded) return null

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