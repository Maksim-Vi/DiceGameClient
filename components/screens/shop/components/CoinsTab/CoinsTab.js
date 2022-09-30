import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Platform, StyleSheet} from "react-native";
import CoinItem from "./CoinItem";
import CoinItemAdmod from "./CoinItemAdmod";
import {RewardedAdEventType, RewardedInterstitialAd, TestIds} from "react-native-google-mobile-ads";
import { getCoinsBonus } from '../../../../protocol/API/API';
import { store } from '../../../../redux/redux-store';
import { updateCurrentUserCoins } from '../../../../redux/reducers/players/PlayersReducer';

const AdUnitID = Platform.OS === 'ios'
    ? 'ca-app-pub-3940256099942544~1458002511'
    : 'ca-app-pub-3940256099942544~3347511713'

const internal = RewardedInterstitialAd.createForAdRequest(TestIds.REWARDED_INTERSTITIAL,{
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
                                   btnText={loadInternal ? 'watch video' : 'waiting video'}/>
                    <CoinItem />
                    <CoinItem />
                    <CoinItem />
                    <CoinItem />
                    <CoinItem />
                    <CoinItem />
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