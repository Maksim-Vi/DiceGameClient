import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  newsData: [],
  countUnreadedNews: 0
}

export const newsReducerSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action) =>{
      state.newsData = action.payload
    },
    setUnreadedNews: (state, action) =>{
      state.countUnreadedNews = action.payload
    },
    updateNews: (state, action) =>{
      const currentNews = state.newsData;

      if(currentNews.length > 0){
        return state.newsData[action.payload.index] = action.payload.updatedNews
      }

      return state.newsData
    },
  },
});

export const {setNews, updateNews, setUnreadedNews} = newsReducerSlice.actions;

export const selectNews = state => state.news.newsData;
export const selectUnreadedNews = state => state.news.countUnreadedNews;

export default newsReducerSlice.reducer;

