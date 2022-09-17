import React from 'react';
import styled from "styled-components";
import Settings from "./components/Bottom/Settings";
import UserInfo from "./components/Bottom/UserInfo";

const TopPanelBottom = (props) => {
    return (
        <PanelBottom>
            <UserInfo userData={props.userData}/>
            <Settings />
        </PanelBottom>
    );
};

const PanelBottom = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`
export default TopPanelBottom;