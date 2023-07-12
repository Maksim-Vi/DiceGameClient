import { getNews, openItemNews } from "../../protocol/API/API";
import { setNews, setUnreadedNews } from "../../redux/reducers/News/NewsReducer";
import { selectMyUser } from "../../redux/reducers/players/PlayersReducer";
import { store } from "../../redux/redux-store";

export default new class NewsManager {
    constructor(){
        this.news = []
    }


    async getNews(){
        const user = selectMyUser(store.getState())
        const news = await getNews(user.id);

        if(news){
            this.news = news

            store.dispatch(setNews(news));
            this.getUnreadedNews();
        }
    }

    async openNews(index, newsId, userId){
        const newsReqData = await openItemNews(newsId, userId)
        if(newsReqData){
            const updated = this.news.map(item=>{
                if(item.id === newsReqData.id){
                    return newsReqData;
                }
            })

            this.news = updated

            this.getUnreadedNews();
            store.dispatch(setNews(updated))
        }

        return this.news
    }

    updateNews(news){
        if(news){
            const updated = this.news.map(item=>{
                if(item.id === news.id){
                    return news;
                }
            })

            this.news = updated

            this.getUnreadedNews();
            store.dispatch(setNews(updated))
        }
    }

    getUnreadedNews(){
        let unreadedNews = 0

        this.news.forEach(item => {
            if(!item.isWatched){
                unreadedNews += 1
            }
        });

        store.dispatch(setUnreadedNews(unreadedNews))
    }
}()