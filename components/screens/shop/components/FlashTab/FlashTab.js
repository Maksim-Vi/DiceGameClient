import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import FlashItem from "./FlashItem";
import {RewardedAdEventType, RewardedInterstitialAd, TestIds} from "react-native-google-mobile-ads";
import { getFlashBonus } from '../../../../protocol/API/API';
import { updateCurrentUserFlash } from '../../../../redux/reducers/players/PlayersReducer';
import FlashItemAdmod from './FlashItemAdmod';
import { store } from '../../../../redux/redux-store';

const AdUnitID = Platform.OS === 'ios'
    ? 'ca-app-pub-3940256099942544~1458002511'
    : 'ca-app-pub-3940256099942544~3347511713'

const internal = RewardedInterstitialAd.createForAdRequest(TestIds.REWARDED_INTERSTITIAL,{
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
      <FlashContainer>
          <FlashScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
              <FlashScrollContainer>
                  <FlashItemAdmod admodHendler={admodHendler} 
                                  btnText={loadInternal ? 'watch video' : 'waiting video'}/>
                  <FlashItem />
                  <FlashItem />
                  <FlashItem />
                  <FlashItem />
                  <FlashItem />
                  <FlashItem />
              </FlashScrollContainer>
              <FlashCardLast />
          </FlashScroll>
      </FlashContainer>
  )
}

const FlashContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
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