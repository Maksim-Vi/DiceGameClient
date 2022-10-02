import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Platform, StyleSheet} from "react-native";
import CoinItem from "./CoinItem";
import CoinItemAdmod from "./CoinItemAdmod";
import {RewardedAdEventType, RewardedInterstitialAd, TestIds} from "react-native-google-mobile-ads";
import { getCoinsBonus } from '../../../../protocol/API/API';
import { store } from '../../../../redux/redux-store';
import { updateCurrentUserCoins } from '../../../../redux/reducers/players/PlayersReducer';
const { APP_TYPE } = Constants.manifest?.extra;

const AdUnitID = Platform.OS === 'ios'
    ?  APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/8219230470' : TestIds.REWARDED_INTERSTITIAL
    : APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/7194208820' : TestIds.REWARDED_INTERSTITIAL

const internal = RewardedInterstitialAd.createForAdRequest(AdUnitID,{
    requestNonPersonalizedAdsOnly: true
})

const CoinsTab = (props) => {

    const [loadInternal, setLadInternal] = useState(false)
   
    const loadReclam = () =>{
        const unsubscribeLoaded = internal.addAdEventListener(RewardedAdEventType.LOADED,()=>{
            setLadInternal(true)
        })
        const unsubscribeClosed = internal.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async ()=>{
            const getBonusCoins = await getCoinsBonus(props.user.username)

            if(getBonusCoins && getBonusCoins.success){
                store.dispatch(updateCurrentUserCoins(getBonusCoins.updatedCoins))
            }
            
            internal.load()
             
        })

        internal.load()

        return () => {
            unsubscribeLoaded()
            unsubscribeClosed()
        }
    }
    
    const admodHendler = () =>{
      if(loadInternal){
        internal.show()
      }
    }

    useEffect(() => {
        const unsubscribeInternalEvents = loadReclam()
        
        return unsubscribeInternalEvents
    }, []);

    return (
        <CoinsContainer>
            <CoinsScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <CoinsScrollContainer>
                    <CoinItemAdmod admodHendler={admodHendler} 
                                   loadInternal={loadInternal} />
                    <CoinItem coins={'10'} price={'1.99'}/>
                    <CoinItem coins={'20'} price={'5.99'}/>
                    <CoinItem coins={'50'} price={'9.99'}/>
                    <CoinItem coins={'100'} price={'18.99'}/>
                    <CoinItem coins={'300'} price={'30.00'}/>
                    <CoinItem coins={'500'} price={'49.99'}/>
                    <CoinItem coins={'1000'} price={'99.00'}/>
                </CoinsScrollContainer>
                <CoinsCardLast />
            </CoinsScroll>
        </CoinsContainer>
    )
}

const CoinsContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`
const CoinsScroll = styled.ScrollView`
  display: flex;
`
const CoinsScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`
const CoinsCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default CoinsTab;