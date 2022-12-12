import React from 'react'
import styled from 'styled-components';
import Tab from './Tabs/Tab';

const arrTabs = ['general','clubs', 'friends']

const ChatTabs = () => {

    const getTabs = () =>{
        let tabs = []

        arrTabs.forEach(tab=>{
            tabs.push(<Tab tabName={tab}/>)
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
    flex: .08;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 70%;
    background-color: #0b61abb0;
    border-radius: 10px;
`

export default ChatTabs