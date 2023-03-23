import React from 'react';
import styled from "styled-components";
import {tabs} from "../../FriendsScreen";
import FriendsContent from "./components/FriendsContent";
import ConfirmContent from "./components/ConfirmContent";
import SearchContent from "./components/SearchContent";

const ContentContainer = (props) => {

    const render = () =>{
        switch (props.type){
            case tabs.added: return <FriendsContent />
            case tabs.confirm: return <ConfirmContent />
            case tabs.search: return <SearchContent searchData={props.searchData}/>
            default: return <FriendsContent />
        }
    }

    return (
        <Container>
            {render()}
        </Container>
    );
};

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 70%;
  margin-top: 10px;
`
export default ContentContainer;