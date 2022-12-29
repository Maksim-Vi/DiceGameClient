import React from 'react';
import styled from "styled-components";
import Text from '../../../../common/Text/Text';
import tooltip from '../../../../../assets/road/tooltip.png'
import coins from '../../../../../assets/topPanel/coins.png'
import diamond from '../../../../../assets/topPanel/diamond.png'
import {rewardType} from '../utils';

const RoadItemInfo = (props) => {

    const getPriceImgByType = () =>{
        switch (props.rewardType) {
            case rewardType.coins: return coins
            case rewardType.diamonds: return diamond
            default:
                break;
        }
    }

    const getOpacity = () =>{
        if(!props.isAvailableExecute && !props.isClaimed && !props.isFinished) return 0.6
        return 1
    }

    if(props.isClaimed) return null

    return (
        <RoadItemInfoContainer>
             <Background style={{opacity: getOpacity()}} source={tooltip} resizeMode={'contain'}>
                <PriceImg source={getPriceImgByType()} resizeMode={ 'stretch'}/>
                <Text large blod color={'#000'}>{props.rewardQuantity}</Text>
             </Background>
        </RoadItemInfoContainer>
    )
};

const RoadItemInfoContainer = styled.View`
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
`
const Background = styled.ImageBackground`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    top: 25px;
    width: 100px;
    height: 100px;
    padding: 20px;
`
const PriceImg = styled.Image`
    width: 30px;
    height: 30px;
`

export default RoadItemInfo;