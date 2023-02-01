import React from 'react';
import styled from "styled-components";
import Text from "../../Text/Text";
import coins from "../../../../assets/topPanel/coins.png";
import diamonds from "../../../../assets/topPanel/diamond.png";
import money from "../../../../assets/collections/money.png";
import ButtonWithImage from "../../Buttons/ButtonWithImage";
import ButtonWithText from "../../Buttons/ButtonWithText";
import C_BUY_GAME_ITEM from "../../../protocol/messages/clients/collections/C_BUY_GAME_ITEM";
import {selectUserCoins, selectUserCrystals} from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";
import {setPaymentBuyRealMoney} from "../../../utils/PaymentHelper";
import { getCollectionDiceImg, getCollectionSquareImg} from "../../../utils/utils";
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import TextWithoutShadow from "../../Text/TextWithoutShadow";
import sale from "../../../../assets/collections/label.png";

const ModalChildrenBuy = (props) => {

    const getButtons = () =>{
        if(!props.openItem) return

        const salePrice = typeof props.openItem.salePrice === 'string'
            ? JSON.parse(props.openItem.salePrice)
            : props.openItem.salePrice

        let image = ''
        let price = ''

        switch (props.openItem.type) {
            case 'coins':{
                image = coins
                price = props.openItem.price.coins
                if(props.openItem.isSale === 'true'){
                    return getSaleBtn('coins',props.openItem.price.coins, salePrice.coins, coins)
                }
                return <ButtonWithImage image={image}
                                        text={price}
                                        margin={2}
                                        btnWidth={45}
                                        btnHeight={30}
                                        padding={0}
                                        clickHandler={()=>confirmModal('coins',price,props.openItem.id)}/>
            }
            case 'diamonds':{
                image = diamonds
                price = props.openItem.price.diamonds

                if(props.openItem.isSale === 'true'){
                    return getSaleBtn('diamonds',props.openItem.price.diamonds, salePrice.diamonds, coins)
                }

                return <ButtonWithImage image={image}
                                        text={price}
                                        margin={2}
                                        btnWidth={45}
                                        btnHeight={30}
                                        padding={0}
                                        clickHandler={()=>confirmModal('diamonds',price,props.openItem.id)}/>
            }
            case 'realmoney':{
                image = money
                price = props.openItem.price.money

                if(props.openItem.isSale === 'true'){
                    return getSaleBtn('money',props.openItem.price.money, salePrice.money, coins)
                }

                return <ButtonWithImage image={image}
                                        text={`${price} $`}
                                        fontFamily={'Gogono-Cocoa'}
                                        margin={2}
                                        btnWidth={45}
                                        btnHeight={30}
                                        padding={0}
                                        clickHandler={()=>confirmModal('money',price,props.openItem.id)}/>
            }
            case 'coins-diamonds':
            case 'coins-realmoney':
            case 'diamonds-realmoney':
            case 'coins-diamonds-realmoney':{
                return (
                    <React.Fragment>
                        {coins !== '' && props.openItem.isSale === 'true' && salePrice.coins !== props.openItem.price.coins
                            ? getSaleBtn('coins',props.openItem.price.coins, salePrice.coins, coins)
                            : <ButtonWithImage text={props.openItem.price.coins}
                                             image={coins}
                                             margin={2}
                                             btnWidth={45}
                                             btnHeight={30}
                                             padding={0}
                                             clickHandler={()=>confirmModal('coins', props.openItem.price.coins, props.openItem.id)}/>}
                        {diamonds !== '' && props.openItem.isSale === 'true' && salePrice.coins !== props.openItem.price.diamonds
                            ? getSaleBtn('diamonds',props.openItem.price.diamonds, salePrice.diamonds, diamonds)
                            : <ButtonWithImage text={diamonds}
                                             image={diamonds}
                                             margin={2}
                                             btnWidth={45}
                                             btnHeight={30}
                                             padding={0}
                                             clickHandler={()=>confirmModal('diamonds', props.openItem.price.diamonds, props.openItem.id)}/>}
                        {
                            props.openItem.price.money === '' || +props.openItem.price.money === 0
                                ? null
                                : +props.openItem.price.money > 0 && props.openItem.isSale === 'true' &&
                                    salePrice.money !== props.openItem.price.money
                                    ? getSaleBtn('money',props.openItem.price.money, salePrice.money, money)
                                    : <ButtonWithImage text={`${props.openItem.price.money} $`}
                                                       fontFamily={'Gogono-Cocoa'}
                                                       image={money}
                                                       margin={2}
                                                       btnWidth={45}
                                                       btnHeight={30}
                                                       padding={0}
                                                       clickHandler={()=>confirmModal('money',props.openItem.price.money,props.openItem.id)}/>}
                    </React.Fragment>
                )
            }
            default:{}
        }
    }

    const confirmModal = (type,price,itemId) =>{
        const userCoins = selectUserCoins(store.getState())
        const userCrystals = selectUserCrystals(store.getState())

        if(
            (type === 'coins' && userCoins < price) ||
            (type === 'diamonds' && userCrystals < price)
        ) {
            alert(`Sorry but you dont have ${type}! play more and then you could buy something =)`)
            return props.setModalVisible(false)
        }

        if(type === 'money'){
            setPaymentBuyRealMoney()
        }

        new C_BUY_GAME_ITEM(type,price,itemId)
        props.setModalVisible(false)
    }

    const getSaleBtn = (type,price, salePrice, image) =>{
        return (
            <PriceSale onPress={()=>{confirmModal(type,salePrice,props.openItem.id)}}
                       style={{ borderBottomWidth: 3 }}
                       activeOpacity={0.9}>
                <PriceImage source={image}/>
                <PriceLine small heavy color='#fff' center>{price}</PriceLine>
                <Sale setShadow={true} shadowColor={'#fff'} madium heavy color='#9a1515'>{salePrice}</Sale>
                {type === 'money' &&
                    <Text fontFamily={'Gogono-Cocoa'}
                          setShadow={true}
                          madium heavy
                          color='#fff'> {'\u0024'}</Text>
                }
            </PriceSale>
        )
    }

    const renderSaleLabel = () =>{
        if(props.openItem.isSale !== 'true') return null

        return <SaleContainer>
            <TextSale large blod center color={'#9a1515'} style={{transform: [{rotate: '-60deg'}]}}>sale</TextSale>
            <SaleImg source={sale} style={{transform: [{rotate: '-20deg'}]}}/>
        </SaleContainer>
    }

    const getItemImgByType = () =>{
        if(props.type === 'dices'){
            return getCollectionDiceImg(props.openItem, props.openItem.sortIndex)
        }

        return getCollectionSquareImg(props.openItem, props.openItem.sortIndex)
    }

    if(!props.openItem) return null

    return (
        <BuyContainer>
            <SquareImage source={getItemImgByType()}/>
            {renderSaleLabel()}

            <Context>
                <Text setShadow={true} large blod center color={'#fff'}>
                    {props.confirmInfo} {/*{props.openItem.name}?*/}
                </Text>
            </Context>

            <ButtonContainer>
                {getButtons()}
            </ButtonContainer>
        </BuyContainer>
    )
}

const BuyContainer = styled.View`
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
    width: 100%;
    height: 100%;
`

const Context = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 30%;
  background-color: #ffc398;
  border: 2px solid rgba(255, 190, 78, 0.77);
  border-radius: 10px;
  margin-top: 20px;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
  width: 90%;
  margin-top: 10px;
`
const SquareImage = styled.Image`
    margin-top: 10px;
  width: 100px;
  height: 100px;
`

const PriceSale = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color:  #5eba7d;
  border-radius: 10px;
  margin: 5px;
  width: 45%;
  height: 40px;
  border: 1px solid rgb(255, 157, 77);
`

const PriceImage = styled.Image`
  width: 30px;
  height: 30px;
`

const PriceLine = styled(TextWithoutShadow)`
  text-decoration-line: line-through;
  text-decoration-style: solid;
  text-decoration-color: #9a1515;
  margin-right: 5px;
`

const SaleContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: -15px;
  left: 0px;
  z-index: 1;
`

const TextSale = styled(TextWithoutShadow)`
  position: absolute;
  top: 45px;
  left: 28px;
  z-index: 2;
`

const SaleImg = styled.Image`
  width: 100px;
  height: 100px;
`

const Sale = styled(Text)`
 
`

const mapStateToProps = (state) => ({
    confirmInfo: selectTranslation(state,defaultTranslation.TR_COLLECTIONS_CONFIRM_INFO),
    fightOpp: selectTranslation(state,defaultTranslation.TR_FIGHT_OPP),
})

export default connect(mapStateToProps)(ModalChildrenBuy);