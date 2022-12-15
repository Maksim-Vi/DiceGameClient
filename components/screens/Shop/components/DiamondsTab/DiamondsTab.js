import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import DiamondsItem from "./DiamondsItem";
import {RewardedAdEventType, RewardedInterstitialAd, TestIds} from "react-native-google-mobile-ads";
import DiamondItemAdmod from './DiamondItemAdmod';
import { getDiamondsBonus } from '../../../../protocol/API/API';
import { updateCurrentUserCrystals } from '../../../../redux/reducers/players/PlayersReducer';
import { store } from '../../../../redux/redux-store';
import Constants from "expo-constants";
const { APP_TYPE } = Constants.manifest?.extra;

const AdUnitID = Platform.OS === 'ios'
    ?  APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/8219230470' : TestIds.REWARDED_INTERSTITIAL
    : APP_TYPE !== 'development' ? 'ca-app-pub-6421975370931679/7194208820' : TestIds.REWARDED_INTERSTITIAL


const internal = RewardedInterstitialAd.createForAdRequest(AdUnitID,{
    requestNonPersonalizedAdsOnly: true
})

const DiamondsTab = (props) => {

  const [loadInternal, setLadInternal] = useState(false)
   
  const loadReclam = () =>{
      const unsubscribeLoaded = internal.addAdEventListener(RewardedAdEventType.LOADED,()=>{
          setLadInternal(true)
      })
      const unsubscribeClosed = internal.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async ()=>{
          const getBonus = await getDiamondsBonus(props.user.username)

          if(getBonus && getBonus.success){
            store.dispatch(updateCurrentUserCrystals(getBonus.updatedCrystals))
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
      <DiamondsContainer>
          <DiamondsScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
              <DiamondsScrollContainer>
                  <DiamondItemAdmod admodHendler={admodHendler} 
                                    loadInternal={loadInternal} />
                  <DiamondsItem diamonds={'3'} price={'1.99'}/>
                  <DiamondsItem diamonds={'5'} price={'4.99'}/>
                  <DiamondsItem diamonds={'10'} price={'9.99'}/>
                  <DiamondsItem diamonds={'20'} price={'18.99'}/>
                  <DiamondsItem diamonds={'30'} price={'29.99'}/>
                  <DiamondsItem diamonds={'50'} price={'49.99'}/>
                  <DiamondsItem diamonds={'100'} price={'99.00'}/>
              </DiamondsScrollContainer>
              <DiamondsCardLast />
          </DiamondsScroll>
      </DiamondsContainer>
  )
}

const DiamondsContainer = styled.View`
  flex: .83;
  display: flex;
  width: 100%;
`
const DiamondsScroll = styled.ScrollView`
  display: flex;
`
const DiamondsScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`
const DiamondsCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default DiamondsTab;