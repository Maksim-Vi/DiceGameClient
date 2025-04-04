import React from 'react'
import styled from 'styled-components';
import Tab from './Tabs/Tab';
import image from '../../../../assets/chat/tabs/group.png'
import { useSelector } from 'react-redux';
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import {store} from "../../../redux/redux-store";

const arrTabsDefault = [
    {chanelName: 'general', image: image},
]

const ChatTabs = () => {

    const chatTabs = useSelector(state => state.chat.chatTabs)

    const getTabs = () =>{
        let tabs = []

        const tabsArray = chatTabs && chatTabs.length > 0 ? chatTabs : arrTabsDefault

        tabsArray.forEach((tab, index)=>{
            const getTranslate = tab.chanelName === 'general' ? defaultTranslation.TR_GENERAL : ''

            tabs.push(<Tab key={index} tabName={selectTranslation(store.getState(),getTranslate)} image={tab.image}/>)
        })


        return tabs
    }


    return (
        <ChatTabsContainer>
            {getTabs()}
            {/*<Tab tabName={'friends'} image={friends}/>*/}
        </ChatTabsContainer>
    )
}

const ChatTabsContainer = styled.View`
    flex: .1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 70%;
    height: 100%;
    background-color: #0b61abb0;
    border-radius: 10px;
`

export default ChatTabs