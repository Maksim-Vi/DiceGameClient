import React from 'react';
import styled from "styled-components";
import Search from "../Search";
import Tabs from "./components/Tabs";

const TabContentContainer = (props) => {
    return (
        <TabsContainer>
            <Search disabledSearch={props.disabledSearch}
                    searchHandler={props.searchHandler}
                    handlerSearchBtn={props.handlerSearchBtn}
                    searchText={props.searchText}/>
            <Tabs active={props.active} changeTab={props.changeTab}/>
        </TabsContainer>
    );
};
const TabsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-top: 10px;
`
export default TabContentContainer;