import C_ENTER_IN_CHAT from "../../protocol/messages/clients/chat/C_ENTER_IN_CHAT"
import C_SEND_MESSAGE from "../../protocol/messages/clients/chat/C_SEND_MESSAGE"
import EventDispatcher from "../../redux/EventDispatcher"
import eventsType from "../../redux/eventsType"
import image from '../../../assets/chat/tabs/group.png'
import { store } from "../../redux/redux-store"
import { addChatTab, cleanChatTabs } from "../../redux/reducers/chat/ChatReducer"
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import Filter from "leo-profanity";

class ChatManager {
    constructor(){

        this.chat = {
            channels: {},
            filter: null
        }

        this.init()
    }

    init = () =>{
        this.chat.filter = Filter

        this.chat.filter.add(this.chat.filter.getDictionary('en'))
        this.chat.filter.add(this.chat.filter.getDictionary('ru'))

        this.addBlockedDataToFilter()
    }

    validMessage = (str) => {
        let isInvalid = false
        const urlRegex = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

        const phoneRegex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/im;
        const emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

        const splitedStr = str.split(' ')
        if(splitedStr && splitedStr.length > 0){
            splitedStr.forEach(string=>{
                if(urlRegex.test(string) || phoneRegex.test(string) || emailRegex.test(string)){
                    isInvalid = true
                }
            })
        }

        if(isInvalid){
            this.addBlockMessageToUser('general')
            return isInvalid
        }

        return isInvalid
    }

    addBlockedDataToFilter = () =>{
        if(this.chat.filter){
            let newBadWordsRus = [
                'сука', 'дура', 'гандон', 'пидарас', 'дурак','лох','пидор','бля','блять',
                'хуй','пизда','вагина','член', 'бздун','бзднуть','бздюх','блудилище',
                'выпердеть', 'высраться','выссаться', 'говно','гавно', 'говенка','говноед',
                'говномес', 'говночист', 'говяга', 'говнюк', 'говняный', 'говна пирога',
                'глиномес', 'изговнять', 'гнида', 'гнидас', 'гнидазавр','гниданидзе','гондон','гондольер',
                'даун','даунитто','дерьмо','дерьмодемон', 'дерьмище','дрисня','дрист','дристануть','обдристаться',
                'дерьмак', 'дристун','дрочить','дрочила','суходрочер','дебил','дебилоид','дрочка','драчун','задрот',
                'дцпшник','елда','елдаклык','елдище','жопа','жопошник','залупа','залупиться','залупинец','засеря',
                'засранец','засрать','защеканец','изговнять','идиот','изосрать','курва','кретин','кретиноид','курвырь',
                'лезбуха','лох','минетчица','мокрощелка','мудак','мудень','мудила','мудозвон','мудацкая','мудасраная дерьмопроелдина',
                'мусор','педрик','пердеж','пердение','пердельник','пердун','пидор','пидорасина','пидорормитна','пидорюга',
                'педерастер','педобратва','дружки педигрипал','писька','писюн','спидозный пес','ссаная псина','спидораковый',
                'срать', 'спермер','спермобак','спермодун','срака','сракаборец','сракалюб','срун','сука','сучара',
                'сучище','титьки','трипер','хер','херня','херовина','хероед','охереть','пошел на хер','хитрожопый','хрен моржовый','шлюха',
                'шлюшидзе', 'хуйня','ебаный','еблан','ебанько','ебло','уебан','уебок','уёбок','урод','конченый','конченный','лошара'
            ];

            let newBadWordsUA = [
               'гній','курва','шалава','шлюха','шмара','стерво','вилупок','їбати','дупа','дупця','дебіл','дурень','кляча','дібіл',
                'їбаний','ебаний'
            ];

            this.chat.filter.add(newBadWordsRus)
            this.chat.filter.add(newBadWordsUA)
        }
    }

    filterMessage = (mess) =>{
        const filteredMessage = this.chat.filter.clean(mess);

        return filteredMessage
    }

    connectionToChatRoom = (chatRoom) =>{
        if(chatRoom){
            new C_ENTER_IN_CHAT(chatRoom)
        }
    }

    chatMassageHandler = (data) =>{
        switch (data.name) {
            case 'S_CHAT_ENTER':
                this.addChatChanel(data.chatRoom, data.username)
                break;
            case 'S_SEND_MESSAGE':
                this.updateChatChanel(data.chatRoom, data.username, data.chatMessage, data.date, 'message')
                break;
            default:             
                break;
        }
    }

    sendChatMessage = (username, chatRoom, chatMessage) =>{
        new C_SEND_MESSAGE(username, chatRoom, chatMessage)
    }

    addChatChanel = (roomChanel) =>{
        if(this.chat && this.chat.channels){
            if(!this.chat.channels[roomChanel]){
                this.addChatTabs(roomChanel)
                return this.createNewChanel(roomChanel)
            }
            console.log('connect to chanel failed');
        }
    }

    addChatTabs = (roomChanel) =>{
        let chatTabs = {}
        switch (roomChanel) {
            case 'general':
                chatTabs = {
                    chanelName: roomChanel, 
                    image: image,
                    sortIndex: 0,
                }
                break;
            case 'clan':
                chatTabs = {
                    chanelName: roomChanel, 
                    image: '',
                    sortIndex: 1,
                }
                break;
            default:
                break;
        }

        chatTabs && store.dispatch(addChatTab(chatTabs))
    }

    createNewChanel = (roomChanel) =>{
        if(roomChanel){
            this.chat.channels[roomChanel] = {
                unreadMessages: 0,
                messages: []
            }
            this.addInfoMessageStartChat(roomChanel)
            console.log('connect to chanel', roomChanel);
        }
    }

    updateChatChanel = (roomChanel, username, chatMessage, date, type) =>{
        if(this.chat.channels[roomChanel]){
            this.chat.channels[roomChanel].unreadMessages = this.chat.channels[roomChanel].unreadMessages + 1
            this.chat.channels[roomChanel].messages.push({
                username: username,
                chatMessage: chatMessage,
                date: date,
                type: type // privet, admin, info, etc
            })

            this.getAllUnreadMessages()
            EventDispatcher.publish(eventsType.UPDATE_CHAT_CHANELS, this.chat.channels)
        }
    }

    getAllUnreadMessages = () =>{
        let unread = 0

        if(this.chat.channels){
            Object.entries(this.chat.channels).forEach(([key, chanel])=>{
                unread += chanel.unreadMessages
            })
        }

        EventDispatcher.publish(eventsType.UPDATE_CHAT_UNREAD_MESSAGES, unread)
    }

    addInfoMessageStartChat = (roomChanel) =>{
        if(roomChanel) {
            const welcomeChat = selectTranslation(store.getState(),defaultTranslation.TR_WELCOME_IRC)
            this.updateChatChanel(roomChanel, 'info', welcomeChat,new Date(),'info')
        }
    }

    addBlockMessageToUser = (roomChanel) =>{
        const mess = 'you use blocked text (url, phone, email)'
        this.updateChatChanel(roomChanel, 'block', mess, new Date(),'block')
    }

    clearAllUnreadMessages = () =>{
        if(this.chat.channels){
            Object.entries(this.chat.channels).forEach(([key, chanel])=>{
                this.clearUnreadMessages(key)
            })
        }
    }

    clearUnreadMessages = (roomChanel) =>{
        if(this.chat.channels[roomChanel]){
            this.chat.channels[roomChanel].unreadMessages = 0
        }
    }

    clearChatChanel = (roomChanel) =>{
        if(this.chat.channels[roomChanel]){
            this.chat.channels[roomChanel] = {
                unreadMessages: 0,
                messages: []
            }
        }
    }

    deleteChatChanel = (roomChanel) =>{
        if(this.chat.channels[roomChanel]){
            delete this.chat.channels[roomChanel];
        }
    }

    clearAllChanels = () =>{
        this.chat = {
            channels: {}
        }

        store.dispatch(cleanChatTabs())
    }

}


export default ChatManager