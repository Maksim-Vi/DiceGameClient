import React from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import {rewardType} from "../utils";
import coins from "../../../../../assets/topPanel/coins.png";
import diamond from "../../../../../assets/topPanel/diamond.png";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";

const Info = (props) => {

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
            <Name small numberOfLines={2}>{props.activeMission.missionName}</Name>

            <WonPriceContainer>
                <PriceImg source={getImageByType()} resizeMode={'stretch'}/>
                <WonPrice center blod large>{props.activeMission.rewardQuantity}</WonPrice>
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

const Name = styled(TextWithoutShadow)`
  width: 50%;
  height: 100%;
  margin-top: 7px;
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