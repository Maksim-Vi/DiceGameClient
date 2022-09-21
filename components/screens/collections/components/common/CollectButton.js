import React from 'react';
import coins from "../../../../../assets/topPanel/coins.png";
import diamonds from "../../../../../assets/topPanel/diamond.png";
import money from '../../../../../assets/collections/money.png'
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import C_SET_ACTIVE_GAME_ITEM from "../../../../protocol/messages/clients/collections/C_SET_ACTIVE_GAME_ITEM";

const CollectButton = ({item,isActive,isCollected,setModalVisible}) => {

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
            image = diamonds
            price = item.price.diamonds
            break
        }
        case 'realmoney':{
            image = money
            price = item.price.money
            break
        }
        case 'coins-diamonds':
        case 'coins-realmoney':
        case 'diamonds-realmoney':
        case 'coins-diamonds-realmoney':{
            textBtn = 'buy'
            break
        }
        default:{}
    }

    const getButtonActiveOrSelect = () =>{
        if(isActive && isCollected){
            return <SelectedBtn disabled>
                <Text small heavy color='#fff' center>Selected</Text>
            </SelectedBtn>
        } else if(!isActive && isCollected){
            return <CollectBtn onPress={selectNewItem}>
                <Text small heavy color='#fff' center>Select</Text>
            </CollectBtn>
        }
    }

    const selectNewItem = () =>{
        new C_SET_ACTIVE_GAME_ITEM(item.collectionType,item.id)
    }

    const clickHandler = () =>{
        setModalVisible(true,item)
    }

    return (
        <React.Fragment>
            {isCollected
                ? getButtonActiveOrSelect()
                : <CollectBtn onPress={clickHandler}>
                    {image && <PriceImage source={image}/>}
                    {price && <Text small heavy color='#fff' center>{price}</Text>}
                    {textBtn && <Text small heavy color='#fff' center>{textBtn}</Text>}
                </CollectBtn>
            }
        </React.Fragment>


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

const SelectedBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: rgba(107, 107, 107, 0.87);
  border-radius: 10px;
  border: 1px solid rgba(255, 157, 77, 0.58);
  width: 80%;
  height: 30px;
`

export default CollectButton;