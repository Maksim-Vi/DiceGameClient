import React from 'react';
import styled from "styled-components";
import Coins from "../../../../common/TopPanel/components/Top/Coins";
import Crystals from "../../../../common/TopPanel/components/Top/Crystals";
import {NativeModules, Platform} from "react-native";

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
    width: 100%;
    ${()=>{
    if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
      return `
         height: 80px;
         justify-content: flex-end;
         padding-bottom: 10px;
      `
    } else {
      return `
         height: 50px;
         justify-content: space-around;
      `
    }
    }}
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