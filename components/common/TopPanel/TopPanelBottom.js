import React from 'react';
import styled from "styled-components";
import RoadButton from './components/Bottom/RoadButton';
import UserInfo from "./components/Bottom/UserInfo";

const TopPanelBottom = (props) => {
    return (
        <PanelBottom>
            <UserInfo userData={props.userData}/>
          
            <PanelEndContainer>
                <RoadButton />
            </PanelEndContainer>
        </PanelBottom>
    );
};

const PanelBottom = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 98%;
    margin-top: 10px;
`
const PanelEndContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
`
export default TopPanelBottom;