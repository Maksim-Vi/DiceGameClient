import React from 'react'
import styled from 'styled-components'
import giftAnim from '../../../../../assets/animation/lottieAnim/gift.json'
import news_item_bg from '../../../../../assets/news/new.png'
import reared_item_bg from '../../../../../assets/news/reared.png'
import Text from '../../../../common/Text/Text'
import { getUrlRequest, transitionState } from '../../../../utils/utils'
import InfoWithoutNumberButton from "../../../../common/Info/InfoWithoutNumberButton";
import {TouchableWithoutFeedback} from "react-native";
import AnimatedLottieView from "lottie-react-native";

const NewsItem = (props) => {

  const getImage = () =>{
    const url = getUrlRequest()

    if(props.newsItem && props.newsItem.image && url){
      return url + props.newsItem.image
    }
  }

  const openNews = () =>{
      if(props.newsItem && props.user){
          props.openNewsData(props.index, props.newsItem.id, props.user.id);
          transitionState("NewsItemScreen", props.newsItem)
      }
  }

  const getTextInfoRender = () => {
    return (
        <NewsInfoContainer>

          <TitleContainer>
            <Text setShadow blod small>{props.user && props.user.language === "EN" ? props.newsItem.title.EN :  props.newsItem.title.UA}</Text>
          </TitleContainer>

          <DescContainer>
              <Text setShadow blod fontSize={10}>
                  {props.user && props.user.language === "EN"
                      ? props.newsItem.text.EN.substring(0,40) + "..."
                      : props.newsItem.text.UA.substring(0,40) + "..." }
              </Text>

              <DataText>
                  <Text setShadow small>{props.newsItem && props.newsItem.createdAt}</Text>
              </DataText>
          </DescContainer>

        </NewsInfoContainer>
    )
  }

  const getImageNewsRender = () => {
    return (
        <NewsImageContainer>
          <NewsImg source={{uri: getImage()}} style={{borderTopRightRadius: 15, borderTopLeftRadius: 15}} resizeMode='stretch'/>
        </NewsImageContainer>
    )
  }

  return (
      <TouchableWithoutFeedback onPress={openNews} accessible={false}>
        <Item>
            <ListItemBG source={props.newsItem && !props.newsItem.isWatched ?  news_item_bg : reared_item_bg} resizeMode={'stretch'}>
              {props.newsItem && !props.newsItem.isWatched &&
                  <InfoWithoutNumberButton top={0} right={15}/>
              }

                {props.newsItem && props.newsItem.actions && props.newsItem.actions.type === "gift" && !props.newsItem.isReceivedGifts &&
                    <AnimatedLottieView source={giftAnim}
                                        loop
                                        autoPlay
                                        style={{
                                            position: 'absolute',
                                            zIndex: 1,
                                            right: 10, bottom: 5,
                                            width: 50,
                                            height: 50
                                        }}/>
                }

              <News>
                 <NewsTopContainer>
                   {getTextInfoRender()}
                   {getImageNewsRender()}
                 </NewsTopContainer>

                 <BottomContainer>
                   <Text setShadow center>watch more...</Text>
                 </BottomContainer>
               </News>
            </ListItemBG>
        </Item>

      </TouchableWithoutFeedback>
  )
}

const Item = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  padding: 0 15px;
`

const ListItemBG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const News = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 95%;
  padding: 5px 10px;
`

const NewsTopContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 70%;
`
const NewsInfoContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 45%;
  height: 100%;
`
const TitleContainer = styled.View`
  width: 100%;
  height: 35%;
  margin-top: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`
const DescContainer = styled.View`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 55%;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`
const NewsImageContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`
const BottomContainer = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const NewsImg = styled.Image`
    width: 100%;
    height: 100%;
`

const DataText = styled.View`
  display: flex;
  margin-top: 5px;
  padding-top: 10px;
  align-items: flex-end;
`
export default NewsItem
