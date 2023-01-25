import styled from "styled-components";
import mainIcon from '../../../assets/nav/main.png'
import shopIcon from '../../../assets/nav/shop.png'
import collectionsIcon from '../../../assets/nav/collections.png'
import chatIcon from '../../../assets/nav/chat.png'
import Text from "../../common/Text/Text";
import {NativeModules, Platform} from "react-native";
import InfoButton from "../../common/Info/InfoButton";
import React from "react";
import EventDispatcher from "../../redux/EventDispatcher";
import eventsType from "../../redux/eventsType";
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import {setActiveTabApp} from "../../redux/reducers/Websocket/WebsocketReducer";
import {store} from "../../redux/redux-store";
import {getIosModel} from "../../utils/utils";
import Sounds, {soundsType} from "../../utils/Sounds";

class TabBar extends React.PureComponent {
    constructor(props){
        super(props)

        this.state={
            unreadMessages: 0,
            activeTab: 'MainScreen'
        }

        this.subscriber = null
    }

    componentDidMount(){
        this.subscriber = EventDispatcher.subscribe(eventsType.UPDATE_CHAT_UNREAD_MESSAGES, this.updateChatUnreadMessages)
    }

    componentWillUnmount(){
        EventDispatcher.unsubscribe(this.subscriber)
    }

    updateChatUnreadMessages = (data) =>{
        if(this.state.activeTab !== 'ChatScreen') {
            this.setState({
                unreadMessages: data
            })
        }
    }

    clearUnreadMessages = () =>{
        window.chatManager.clearAllUnreadMessages()
        this.setState({unreadMessages: 0})
    }

    onPress = (route, isFocused) => {
        if (!isFocused) {
            if(route.name === 'ChatScreen'){
                this.clearUnreadMessages()
            }
            this.setState({activeTab: route.name})
            store.dispatch(setActiveTabApp(route.name))
            this.props.navigation.navigate({name: route.name, merge: true});
            Sounds.loadAndPlayFile(soundsType.click2)
        }
    };

    getIconName = (route) => {
        switch (route.name) {
            case "MainScreen":
                return mainIcon;
            case "ShopScreen":
                return shopIcon;
            case "CollectionsScreen":
                return collectionsIcon;
            case "ChatScreen":
                return chatIcon;
            default:
                return startGameIcon
        }
    };

    getText = (route) => {
        switch (route.name) {
            case "MainScreen":
                return this.props.home;
            case "ShopScreen":
                return this.props.shop;
            case "CollectionsScreen":
                return this.props.collection;
            case "ChatScreen":
                return this.props.chat;

            default:
                return this.props.home
        }
    };

    render() {
        return (
            <TabsContainer>
                {this.props.state.routes.map((route, index) => {
                    const isFocused = this.props.state.index === index;

                    return (
                        <TabIconContainer key={index} focused={isFocused} onPress={() => this.onPress(route, isFocused)}>
                            <NavImage source={this.getIconName(route)}/>
                            <Text setShadow={true} heavy medium color={'#ff9d4d'}>{this.getText(route)}</Text>
                            {isFocused &&
                                <Active style={{borderTopWidth: 4, borderBottomWidth: 0}}/>
                            }
                            {route.name === 'ChatScreen' && !isFocused && this.state.unreadMessages > 0 &&
                                <InfoButton count={this.state.unreadMessages}/>
                            }
                        </TabIconContainer>
                    );
                })}
            </TabsContainer>
        );
    }
};

const TabsContainer = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  ${() => {
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
      return `
        height: 70px;
      `
    } else {
      return `
        height: 50px;
      `
    }
  }}
`;

const TabIconContainer = styled.TouchableOpacity`
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  ${() => {
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
      return `
        margin-bottom: 20px;
      `
    } else {
      return `
        margin-bottom: 10px;
      `
    }
  }}
`;

const NavImage = styled.Image`
  width: 55px;
  height: 55px;
`;

const Active = styled.View`
  position: absolute;
  top: -10px;
  width: 70px;
  height: 500px;
  background-color: rgba(220, 220, 220, 0.1);
  border: 2px solid rgba(229, 229, 229, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const mapStateToProps = (state) => ({
    shop: selectTranslation(state,defaultTranslation.TR_SHOP),
    collection: selectTranslation(state,defaultTranslation.TR_COLLECTION),
    home: selectTranslation(state,defaultTranslation.TR_HOME),
    chat: selectTranslation(state,defaultTranslation.TR_CHAT),
})

export default connect(mapStateToProps)(TabBar);
