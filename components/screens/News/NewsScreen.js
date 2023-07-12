import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import ButtonBack from '../../common/Buttons/Back/ButtonBack'
import NewsTitle from './components/NewsTitle/NewsTitle'
import NewsItem from './components/NewsItem/NewsItem'
import { Animated } from 'react-native'
import { useSelector } from 'react-redux'
import { selectMyUser } from '../../redux/reducers/players/PlayersReducer'
import { getNews } from '../../protocol/API/API'
import NewsManager from '../../managers/News/NewsManager'
import {selectNews} from "../../redux/reducers/News/NewsReducer";

const NewsScreen = () => {

  const user = useSelector(selectMyUser)
  const news = useSelector(selectNews)

  const [newsData, setNewsData] = useState(news)

  const loadNewsData = async () => {
    const newsReqData = await getNews(user.id)

    if(newsReqData){
      setNewsData(newsReqData);
    }
  }

  const openNewsData = async (index, newsId, userId) =>{
    const updatedNews = await NewsManager.openNews(index, newsId, userId)

    if(updatedNews){
      setNewsData(updatedNews)
    }
  }

  const renderItem = (data) =>{
    if(data.item){
      return <NewsItem index={data.index} newsItem={data.item} user={user} openNewsData={openNewsData}/>
    }
  }

  useEffect(()=>{
    if(newsData.length === 0){
      loadNewsData()
    }
  }, [])

  useEffect(()=>{
    setNewsData(news)
  }, [news])

  return (
    <BackgroundWrapper>
      <ButtonBack left={'3%'} top={'9.5%'} goMainPage={true}/>
     
      <TitleContainer>
        <NewsTitle />
      </TitleContainer>
    
      
      <NewsContainer>
          <NewsFlatList
                contentContainerStyle = {{ alignItems: 'flex-start'}}
                data={newsData}
                renderItem={renderItem}
                scrollEnabled
                keyExtractor={item => item && item.id} />
      </NewsContainer>
    </BackgroundWrapper>
  
  )
}

const NewsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`
const NewsFlatList = styled(Animated.FlatList)`
  width: 100%;
  height: 100%;
  margin-top: 10px;
`

export default NewsScreen