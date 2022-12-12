import React from 'react'
import styled from 'styled-components';
import Tab from './Tabs/Tab';
import image from '../../../../assets/chat/tabs/group.png'
import clan from '../../../../assets/chat/tabs/clan.png'
import friends from '../../../../assets/chat/tabs/friends.png'

const arrTabs = [
    {chanelName: 'general', image: image},
    {chanelName: 'clubs', image: clan}, 
    {chanelName: 'friends', image: friends}, 
]

const ChatTabs = () => {

    const getTabs = () =>{
        let tabs = []

        arrTabs.forEach(tab=>{
            tabs.push(<Tab tabName={tab.chanelName} image={tab.image}/>)
        })

        return tabs
    }


    return (
        <ChatTabsContainer>
            {getTabs()}
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