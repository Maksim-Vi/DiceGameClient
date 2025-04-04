import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {Platform, StyleSheet} from "react-native";
import FlashItem from "./FlashItem";
import {RewardedAdEventType, RewardedInterstitialAd, TestIds} from "react-native-google-mobile-ads";
import { getFlashBonus } from '../../../../protocol/API/API';
import { updateCurrentUserFlash } from '../../../../redux/reducers/players/PlayersReducer';
import FlashItemAdmod from './FlashItemAdmod';
import { store } from '../../../../redux/redux-store';

const AdUnitID = Platform.OS === 'ios'
    ?  process.env.APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/8219230470' : TestIds.REWARDED_INTERSTITIAL
    : process.env.APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/7194208820' : TestIds.REWARDED_INTERSTITIAL


const internal = RewardedInterstitialAd.createForAdRequest(AdUnitID,{
    requestNonPersonalizedAdsOnly: true
})
const FlashTab = (props) => {

  const [loadInternal, setLadInternal] = useState(false)
   
  const loadReclam = () =>{
      const unsubscribeLoaded = internal.addAdEventListener(RewardedAdEventType.LOADED,()=>{
          setLadInternal(true)
      })
      const unsubscribeClosed = internal.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async ()=>{
          const getBonus = await getFlashBonus(props.user.username)

          if(getBonus && getBonus.success){
            store.dispatch(updateCurrentUserFlash(getBonus.updatedFlash))
            setTimeout(()=>{
              internal.load()
            },5000)
          }
      })

      internal.load()

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

  useEffect(() => {
      const unsubscribeInternalEvents = loadReclam()
      
      return unsubscribeInternalEvents
  }, []);

  return (
      <FlashContainer>
          <FlashScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
              <FlashScrollContainer>
                  <FlashItemAdmod admodHendler={admodHendler} 
                                  loadInternal={loadInternal} />
                  <FlashItem flash={'1'} price={'1.99'}/>
                  <FlashItem flash={'3'} price={'4.99'}/>
                  <FlashItem flash={'5'} price={'7.99'}/>
                  <FlashItem flash={'10'} price={'12.00'}/>
                  <FlashItem flash={'30'} price={'25.99'}/>
              </FlashScrollContainer>
              <FlashCardLast />
          </FlashScroll>
      </FlashContainer>
  )
}

const FlashContainer = styled.View`
  flex: .83;
  display: flex;
  width: 100%;
`
const FlashScroll = styled.ScrollView`
  display: flex;
`
const FlashScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`
const FlashCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default FlashTab;