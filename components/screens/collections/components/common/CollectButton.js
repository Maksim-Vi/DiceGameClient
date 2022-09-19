import React from 'react';
import coins from "../../../../../assets/topPanel/coins.png";
import deamonds from "../../../../../assets/topPanel/diamond.png";
import money from '../../../../../assets/collections/money.png'
import Text from "../../../../common/Text/Text";
import styled from "styled-components";

const CollectButton = ({item}) => {

    let image = ''
    let textBtn = ''
    let price = ''

    switch (item.type) {
        case 'coins':{
            image = coins
            price = item.price.coins
            break
        }
        case 'diamonds':{
            image = deamonds
            price = item.price.diamonds
            break
        }
        case 'realmoney':{
            image = money
            price = item.price.money
            break
        }
        case 'coins-diamonds':{
            textBtn = 'buy'
            break
        }
        case 'coins-realmoney':{
            textBtn = 'buy'
            break
        }
        case 'diamonds-realmoney':{
            textBtn = 'buy'
            break
        }
        case 'coins-diamonds-realmoney':{
            textBtn = 'buy'
            break
        }
        default:{}
    }

    return (
        <CollectBtn onPress={()=>{}}>
            {image && <PriceImage source={image}/>}
            {price && <Text small heavy color='#fff' center>{price}</Text>}
            {textBtn && <Text small heavy color='#fff' center>{textBtn}</Text>}
        </CollectBtn>
    )
};

const PriceImage = styled.Image`
  width: 20px;
  height: 20px;
`
const CollectBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: rgba(20, 197, 55, 0.84);
  border-radius: 10px;
  border: 1px solid rgb(255, 157, 77);
  width: 80%;
  height: 30px;
`

export default CollectButton;