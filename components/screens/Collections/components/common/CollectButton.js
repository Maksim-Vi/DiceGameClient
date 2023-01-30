import React from 'react';
import coins from "../../../../../assets/topPanel/coins.png";
import diamonds from "../../../../../assets/topPanel/diamond.png";
import money from '../../../../../assets/collections/money.png'
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import C_SET_ACTIVE_GAME_ITEM from "../../../../protocol/messages/clients/collections/C_SET_ACTIVE_GAME_ITEM";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import {store} from "../../../../redux/redux-store";
import {setInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";

const CollectButton = ({item,isActive,isSale,isLocked,isCollected,setModalVisible, ...props}) => {

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
            textBtn = props.buy
            break
        }
        default:{}
    }

    const getButtonActiveOrSelect = () =>{
        if(!isLocked && isActive && isCollected){
            return <SelectedBtn disabled style={{ borderBottomWidth: 3 }} activeOpacity={0.9}>
                <Text setShadow={true} small heavy color='#fff' center>{props.selected}</Text>
            </SelectedBtn>
        } else if(!isLocked && !isActive && isCollected){
            return <CollectBtn onPress={selectNewItem} style={{ borderBottomWidth: 3 }} activeOpacity={0.9}>
                <Text setShadow={true} small heavy color='#fff' center>{props.select}</Text>
            </CollectBtn>
        } else if(isLocked){
            return <CollectLockedBtn onPress={setLockedAlarm} style={{ borderBottomWidth: 3 }} activeOpacity={0.9}>
                <Text setShadow={true} small heavy color='#fff' center>{props.locked}</Text>
            </CollectLockedBtn>
        }
    }

    const getSalePrice = () =>{
        const salePrice = typeof item.salePrice === 'string' ? JSON.parse(item.salePrice) : item.salePrice

        switch (item.saleType) {
            case 'coins': return salePrice.coins
            case 'diamonds': return salePrice.diamonds
            case 'realmoney': return salePrice.money
            default: return null
        }
    }

    const selectNewItem = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        new C_SET_ACTIVE_GAME_ITEM(item.collectionType,item.id)
    }

    const setLockedAlarm = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)

        const desc = props.lockedPopupDesc.replace('<lvl>', item.lvlUnlock)
        store.dispatch(setInfoPopup({visible: true, data: {title: props.lockedPopupTitle, text: desc}}))
    }

    const clickHandler = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        setModalVisible(true,item)
    }

    return (
        <React.Fragment>
            {isActive || isLocked || isCollected
                ? getButtonActiveOrSelect()
                : <CollectBtn onPress={clickHandler} style={{ borderBottomWidth: 3 }} activeOpacity={0.9}>
                    {image && <PriceImage source={image}/>}
                    {price && !isSale
                        ? <Text setShadow={true} small heavy color='#fff' center>{price}</Text>
                        : <Price small heavy color='#fff' center>{price}</Price>
                    }
                    {isSale && <SalePrice setShadow={true} shadowColor={'#fff'} madium heavy color='#9a1515'>{getSalePrice()}</SalePrice>}
                    {textBtn && <Text setShadow={true} small heavy color='#fff' center>{textBtn}</Text>}
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

const CollectLockedBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: rgba(135, 140, 135, 0.84);
  border-radius: 10px;
  border: 1px solid rgba(255, 157, 77, 0.42);
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

const Price = styled(TextWithoutShadow)`
  text-decoration-line: line-through;
  text-decoration-style: solid;
  text-decoration-color: #9a1515;
  margin-right: 5px;
`

const SalePrice = styled(Text)`
    padding-left: 10px;
`

const mapStateToProps = (state) => ({
    select: selectTranslation(state,defaultTranslation.TR_SELECT),
    selected: selectTranslation(state,defaultTranslation.TR_SELECTED),
    locked: selectTranslation(state,defaultTranslation.TR_LOCKED),
    lockedPopupTitle: selectTranslation(state,defaultTranslation.TR_COLLECTION_LOCKED_TITLE),
    lockedPopupDesc: selectTranslation(state,defaultTranslation.TR_COLLECTION_LOCKED_DESC),
    buy: selectTranslation(state,defaultTranslation.TR_BUY),
})

export default connect(mapStateToProps)(CollectButton);