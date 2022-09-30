import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import DiamondsItem from "./DiamondsItem";
import {RewardedAdEventType, RewardedInterstitialAd, TestIds} from "react-native-google-mobile-ads";
import DiamondItemAdmod from './DiamondItemAdmod';
import { getDiamondsBonus } from '../../../../protocol/API/API';
import { updateCurrentUserCrystals } from '../../../../redux/reducers/players/PlayersReducer';
import { store } from '../../../../redux/redux-store';

const AdUnitID = Platform.OS === 'ios'
    ?  process.env.NODE_ENV !== 'development' ? 'ca-app-pub-6421975370931679/8219230470' : TestIds.REWARDED_INTERSTITIAL
    : process.env.NODE_ENV !== 'development' ? 'ca-app-pub-6421975370931679/7194208820' : TestIds.REWARDED_INTERSTITIAL


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
      <DiamondsContainer>
          <DiamondsScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
              <DiamondsScrollContainer>
                  <DiamondItemAdmod admodHendler={admodHendler} 
                                    btnText={loadInternal ? 'watch video' : 'waiting video'}/>
                  <DiamondsItem />
                  <DiamondsItem />
                  <DiamondsItem />
                  <DiamondsItem />
                  <DiamondsItem />
                  <DiamondsItem />
              </DiamondsScrollContainer>
              <DiamondsCardLast />
          </DiamondsScroll>
      </DiamondsContainer>
  )
}

const DiamondsContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
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