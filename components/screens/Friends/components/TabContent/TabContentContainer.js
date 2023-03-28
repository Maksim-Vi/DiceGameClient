import React from 'react';
import styled from "styled-components";
import Search from "../Search";
import Tabs from "./components/Tabs";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {store} from "../../../../redux/redux-store";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const TabContentContainer = (props) => {
    return (
        <TabsContainer>
            <Search disabledSearch={props.disabledSearch}
                    searchHandler={props.searchHandler}
                    handlerSearchBtn={props.handlerSearchBtn}
                    searchText={selectTranslation(store.getState(),defaultTranslation.TR_SEARCH)}/>
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