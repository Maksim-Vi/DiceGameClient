import React from 'react';
import styled from "styled-components";
import Coins from "../../../../common/TopPanel/components/Top/Coins";
import Crystals from "../../../../common/TopPanel/components/Top/Crystals";

const TopPanelCollection = (props) => {
    return (
        <TopPanel>
            <ElementsContainer>
                <Coins coins={props.coins || 0} width={100}/>
                <Crystals crystals={props.crystals || 0} width={100}/>
            </ElementsContainer>
        </TopPanel>
    );
}

const TopPanel = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    background-color: rgb(1,1,70);
`
const ElementsContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
`

export default TopPanelCollection;