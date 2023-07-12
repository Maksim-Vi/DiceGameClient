import React from 'react'
import styled from 'styled-components'
import news_item_bg from '../../../../../assets/news/new.png'
import reared_item_bg from '../../../../../assets/news/reared.png'
import Text from '../../../../common/Text/Text'
import { getUrlRequest, transitionState } from '../../../../utils/utils'
import InfoWithoutNumberButton from "../../../../common/Info/InfoWithoutNumberButton";

const NewsItem = (props) => {

  const getImaage = () =>{
    const url = getUrlRequest()

    if(props.newsItem.image && url){
      return url + props.newsItem.image
    }
  }

  const openNews = () =>{
    props.openNewsData(props.index, props.newsItem.id, props.user.id);
    transitionState("NewsItemScreen", props.newsItem)
  }

  const getTextInfoRender = () =>{
    return (
        <NewsInfoContainer>

          <TitleContainer>
            <Text setShadow blod madium >{props.user.language === "EN" ? props.newsItem.title.EN :  props.newsItem.title.UA}</Text>
          </TitleContainer>


          <DescContainer>
            <Text setShadow blod fontSize={10} numberOfLines={3} ellipsizeMode='middle'>{props.user.language === "EN" ? props.newsItem.text.EN :  props.newsItem.text.UA}</Text>
            <DataText setShadow small right>{props.newsItem.createdAt}</DataText>
          </DescContainer>

        </NewsInfoContainer>
    )
  }

  const getImageNewsRender = () =>{
    return (
        <NewsImageContainer>
          <NewsImg source={{uri: getImaage()}} style={{borderTopRightRadius: 15, borderTopLeftRadius: 15}} resizeMode='cover'/>
        </NewsImageContainer>
    )
  }

  return (
    <ItemTouch onPress={openNews}>
      <Item>
        <ListItemBG source={!props.newsItem.isWatched ?  news_item_bg : reared_item_bg} resizeMode={'stretch'}>
          {!props.newsItem.isWatched &&
              <InfoWithoutNumberButton top={0} right={15}/>
          }
          {props.newsItem.isWatched && props.newsItem.actions && !props.newsItem.isReceivedGifts &&
              <InfoWithoutNumberButton top={0} right={15}/>
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
    </ItemTouch>
  )
}

const ItemTouch = styled.TouchableWithoutFeedback`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 130px;
  margin-bottom: 10px;
  padding: 0 15px;
`

const Item = styled.View`
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
  margin-top: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`
const DescContainer = styled.View`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
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
const DataText = styled(Text)`
  margin-top: 10px;
  padding-top: 10px;
`
export default NewsItem
