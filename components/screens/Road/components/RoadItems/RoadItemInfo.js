import React from 'react';
import styled from "styled-components";
import Text from '../../../../common/Text/Text';
import tooltip from '../../../../../assets/road/tooltip.png'
import coins from '../../../../../assets/topPanel/coins.png'
import diamond from '../../../../../assets/topPanel/diamond.png'
import { typesRoadBtns } from '../utils';

const RoadItemInfo = (props) => {

    const getPriceImgByType = () =>{
        switch (props.rewardType) {
            case 'coins': return coins
            case 'diamonds': return diamond
            default:
                break;
        }
    }

    if(props.type === typesRoadBtns.claimed) return null

    return (
        <RoadItemInfoContainer>
             <Background source={tooltip} resizeMode={'contain'}>
                <PriceImg source={getPriceImgByType()} resizeMode={ 'stretch'}/>
                <Text large blod color={'#000'}>{props.price}</Text>
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