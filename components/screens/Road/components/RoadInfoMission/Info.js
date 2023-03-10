import React from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import {rewardType} from "../utils";
import coins from "../../../../../assets/topPanel/coins.png";
import diamond from "../../../../../assets/topPanel/diamond.png";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {store} from "../../../../redux/redux-store";

const Info = (props) => {

    const translation = selectTranslation(store.getState(), props.activeMission.missionName)

    const getImageByType = () =>{
        switch (props.activeMission.rewardType) {
            case rewardType.coins: return coins
            case rewardType.diamonds: return diamond
            default:
                break;
        }
    }

    return (
        <InfoContainer>
            <NameContainer>
                <Text setShadow numberOfLines={3} blod small>{translation}</Text>
            </NameContainer>

            <WonPriceContainer>
                <PriceImg source={getImageByType()} resizeMode={'stretch'}/>
                <WonPrice setShadow center blod large>{props.activeMission.rewardQuantity}</WonPrice>
            </WonPriceContainer>
        </InfoContainer>
    );
};

const InfoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  height: 50%;
`

const NameContainer = styled.View`
  width: 50%;
`

const WonPriceContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
const PriceImg = styled.Image`
    width: 30px;
    height: 30px;
`
const WonPrice = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Info;