import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import ButtonBack from '../../common/Buttons/Back/ButtonBack'
import {Animated, Linking, SafeAreaView, useWindowDimensions} from 'react-native'
import Text from '../../common/Text/Text'
import {getUrlRequest, transitionState} from '../../utils/utils'
import {CallToActions, newsActionsRedirectTypes, newsActionsTypes} from "./NewsActions";
import ButtonWithText from "../../common/Buttons/ButtonWithText";
import {claimNewsGift} from "../../protocol/API/API";
import {useSelector} from "react-redux";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";
import {selectDefaultParams, selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import NewsManager from "../../managers/News/NewsManager";
import defaultParams from "../../redux/reducers/language/defaultParams";
import app from '../../../app.json'
import Sounds, {soundsType} from "../../utils/Sounds";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {store} from "../../redux/redux-store";
import {setInfoPopup} from "../../redux/reducers/popups/PopupsReducer";

const NewsItemScreen = ({route}) => {

  const [newsItem, setNewsItem] = useState(route.params)

  const {width} = useWindowDimensions()
  const buttonName = useSelector(state => selectTranslation(state, newsItem.actions.buttonName))
  const updateButtonName = useSelector(state => selectTranslation(state, defaultTranslation.TR_UPDATE))
  const url = useSelector(state => selectTranslation(state, defaultTranslation.SHARE_GAME_URL))
  const currentClientVersion = useSelector(state => selectDefaultParams(state, defaultParams.CURRENT_CLIENT_VERSION))

  const user = useSelector(selectMyUser)

  const goBack = () =>{
    transitionState('NewsScreen')
  }
  const getImaage = () =>{
    const url = getUrlRequest()

    if(newsItem.image && url){
        return url + newsItem.image
    }
  }

  const clickButtonGift = async () =>{
      Sounds.loadAndPlayFile(soundsType.click2)
      switch (newsItem.actions.type) {
          case newsActionsTypes.Link: {
              CallToActions(newsItem.actions);
              break
          }
          case newsActionsTypes.Redirect: {
              CallToActions(newsItem.actions);
              break
          }
          case newsActionsTypes.Gift: {
              if(newsItem && newsItem.actions && !newsItem.isReceivedGifts){
                  const claimRes = await claimNewsGift(newsItem.id, user.id, newsItem.actions.giftType, newsItem.actions.reward);

                  if(claimRes && claimRes.success){
                      setNewsItem(claimRes.news);
                      NewsManager.updateNews(claimRes.news);

                      if(claimRes.news && claimRes.news.actions){
                          CallToActions({type: claimRes.news.actions.type, giftType: claimRes.news.actions.giftType, reward: claimRes.news.actions.reward});
                      }
                  }
              }
              break
          }
      }
  }

  const updateGame = async () =>{
      Sounds.loadAndPlayFile(soundsType.click2)
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
              Linking.openURL(url);
          } else {
              store.dispatch(setInfoPopup({visible: true, data: {text: 'Can not open the link, please, update the game from the store.\n\n Thanks for understand Knocky Dice team!'}}))
          }
      });
  }

  const getButton = () =>{

      if(newsItem && newsItem.isNeedUpdate){
        if(currentClientVersion !== app.expo.version){
            return <ButtonWithText width={'70%'}
                                    height={'50px'}
                                    text={updateButtonName}
                                    clickHandler={updateGame}/>
        }
      }

      return <ButtonWithText width={'70%'}
                             height={'50px'}
                             disabled={newsItem.isReceivedGifts}
                             text={buttonName}
                             clickHandler={clickButtonGift}/>

  }

  return (
    <BackgroundWrapper>
      <ButtonBack left={'3%'} top={'5%'} leaveGame={goBack}/>
      <NewsContainer>
          <NewsImageContainer>
              <NewsImg source={{uri: getImaage()}} style={{borderTopRightRadius: 15, borderTopLeftRadius: 15}} resizeMode='cover'/>
          </NewsImageContainer>

          <TitleContainer>
              <Text setShadow blod title center>{user.language === "EN" ? newsItem.title.EN :  newsItem.title.UA}</Text>
          </TitleContainer>
          <SafeAreaView style={{flex: 0.75}}>
              <ScrollText>
                  <Text setShadow blod large center>{user.language === "EN" ? newsItem.text.EN : newsItem.text.UA}</Text>

                  {newsItem.actions && newsItem.actions.buttonName &&
                      <ButtonContainer width={width}>
                          {getButton()}
                      </ButtonContainer>

                  }
                  <Empty />
              </ScrollText>
          </SafeAreaView>

      </NewsContainer>
    </BackgroundWrapper>
  
  )
}

const NewsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 30%;
`
const NewsImageContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 150px;
  margin-bottom: 10px;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width ? `${props.width - 50}px` : "100%"};
  margin-top: 30px;
  margin-bottom: 10px;
`

const NewsImg = styled.Image`
    width: 100%;
    height: 100%;
`

const TitleContainer = styled.View`
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
`

const ScrollText = styled.ScrollView`
  width: 100%;
  padding: 10px;
`

const Empty = styled.View`
  width: 100%;
  height: 50px;
`

export default NewsItemScreen