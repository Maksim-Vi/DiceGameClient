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

        if(user){
            const news = await getNews(user.id);

            if(news){
                this.news = news

                store.dispatch(setNews(news));
                this.getUnreadedNews();
            }
        }
    }

    async openNews(index, newsId, userId){
        const newsReqData = await openItemNews(newsId, userId)

        if(newsReqData){
            let updated = []
            for (let i = 0; i < this.news.length; i++){
                if(this.news[i].id === newsReqData.id){
                    updated.push(newsReqData);
                } else {
                    updated.push(this.news[i]);
                }
            }

            this.news = updated

            this.getUnreadedNews();
            store.dispatch(setNews(updated))
        }

        return this.news
    }

    updateNews(news){
        if(news){
            let updated = []
            for (let i = 0; i < this.news.length; i++){
                if(this.news[i].id === news.id){
                    updated.push(news);
                } else {
                    updated.push(this.news[i]);
                }
            }

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