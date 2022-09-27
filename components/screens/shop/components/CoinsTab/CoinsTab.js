import React from 'react';
import styled from "styled-components";
import {Platform, StyleSheet} from "react-native";
import CoinItem from "./CoinItem";
import CoinItemAdmod from "./CoinItemAdmod";
//import {AdMobInterstitial} from "expo-ads-admob";

const CoinsTab = (props) => {

    const AdUnitID = Platform.OS === 'ios'
        ? 'ca-app-pub-3940256099942544~1458002511'
        : 'ca-app-pub-3940256099942544~3347511713'

    // const loadAdmod = async () =>{
    //     await AdMobInterstitial.setAdUnitID(AdUnitID)
    //     await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true})
    // }
    //
    // AdMobInterstitial.addEventListener('rewardedVideoUserDidEarnReward', (reward)=>{
    //     console.log('ANSWER rewardedVideoUserDidEarnReward', reward)
    // })
    //
    // AdMobInterstitial.addEventListener('rewardedVideoDidFailToLoad', ()=>{
    //     console.log('ANSWER rewardedVideoDidFailToLoad')
    //     loadAdmod()
    // })
    //
    // AdMobInterstitial.addEventListener('rewardedVideoDidDismiss', ()=>{
    //     console.log('ANSWER rewardedVideoDidDismiss')
    //     loadAdmod()
    // })

    const admodHendler = async () =>{
        //await AdMobInterstitial.showAdAsync()
    }
    //
    // React.useEffect(()=>{
    //     return ()=>{
    //         AdMobInterstitial.removeAllListeners()
    //     }
    // },[])

    return (
        <CoinsContainer>
            <CoinsScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <CoinsScrollContainer>
                    <CoinItemAdmod admodHendler={admodHendler}/>
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