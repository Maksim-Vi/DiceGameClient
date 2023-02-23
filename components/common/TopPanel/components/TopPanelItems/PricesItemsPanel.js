import React from 'react';
import Coins from "../Top/Coins";
import Crystals from "../Top/Crystals";
import Flash from "../Top/Flash";
import {NativeModules, Platform} from "react-native";
import styled from 'styled-components'
import {getIosModel} from "../../../../utils/utils";
import bg from "../../../../../assets/topPanel/btns/TopPanel.png";
import BackgroundButtons from "../../../BackgroundWrapper/BackgroundButtons";

const PricesItemsPanel = ({userData}) => {
    return (
        <TopPanelContainer>
            <BackgroundButtons width={100} height={55} bgButton={bg}>
                <TopPanelItemsContainer>
                    <ElementsContainer>
                        <Coins coins={userData.coins}/>
                        <Crystals crystals={userData.crystals}/>
                        <Flash crystals={userData.flash}/>
                    </ElementsContainer>
                </TopPanelItemsContainer>
            </BackgroundButtons>

            <ProgressContainer>
                <Progress progress={userData.experience ? userData.experience.progress : 0}/>
            </ProgressContainer>
        </TopPanelContainer>
    )
}

const TopPanelContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
`
const TopPanelItemsContainer = styled.View`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    //background-color: rgb(1,1,70);
    width: 100%;
    //border-radius: 15px;
`
const ElementsContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
`
const ProgressContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: rgb(1,1,70);
  height: 0.1px;
  ${()=>{
    const isIos = getIosModel()
    if(Platform.OS === 'ios' && isIos >= 10){
      return `
         width: 95%;
         border-radius: 5px;
      `
    } else {
      return 'width: 100%;'
    }
  }}
`
const Progress = styled.View`
    display: flex;
    width: 100%;
    height: 4px;
    background-color: rgb(255,157,77);
    border-radius: 5px;
    ${props=>{
      if(props.progress){
          return `width: ${props.progress}%`;
      } else {
          return `width: 0%`;
      }
    }}
`

export default PricesItemsPanel;