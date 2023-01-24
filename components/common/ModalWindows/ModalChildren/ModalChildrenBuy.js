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
import {setInfoPopup} from "../../../redux/reducers/popups/PopupsReducer";

const ModalChildrenBuy = (props) => {

    const getButtons = () =>{
        if(!props.openItem) return

        let image = ''
        let price = ''

        switch (props.openItem.type) {
            case 'coins':{
                image = coins
                price = props.openItem.price.coins
                return <ButtonWithImage image={image}
                                        text={price}
                                        clickHandler={()=>confirmModal('coins',price,props.openItem.id)}/>
            }
            case 'diamonds':{
                image = diamonds
                price = props.openItem.price.diamonds
                return <ButtonWithImage image={image}
                                        text={price}
                                        clickHandler={()=>confirmModal('diamonds',price,props.openItem.id)}/>
            }
            case 'realmoney':{
                image = money
                price = props.openItem.price.money
                return <ButtonWithImage image={image}
                                        text={price}
                                        clickHandler={()=>confirmModal('realmoney',price,props.openItem.id)}/>
            }
            case 'coins-diamonds':
            case 'coins-realmoney':
            case 'diamonds-realmoney':
            case 'coins-diamonds-realmoney':{
                let coins, diamonds, money = ''
                if(props.openItem.type === 'coins-diamonds'){
                    coins = `${props.openItem.price.coins} coins`
                    diamonds = `${props.openItem.price.diamonds} diamonds`
                } else if(props.openItem.type === 'coins-realmoney') {
                    coins = `${props.openItem.price.coins} coins`
                    diamonds = `${props.openItem.price.money} $`
                } else if(props.openItem.type === 'diamonds-realmoney'){
                    coins = `${props.openItem.price.diamonds} diamonds`
                    diamonds = `${props.openItem.price.money} $`
                } else if(props.openItem.type === 'coins-diamonds-realmoney'){
                    coins = `${props.openItem.price.coins} coins`
                    diamonds = `${props.openItem.price.diamonds} diamonds`
                    money = `${props.openItem.price.money} $`
                }
                return (
                    <React.Fragment>
                        {coins !== '' && <ButtonWithText text={coins}
                                                         clickHandler={()=>confirmModal(
                                                             'coins',
                                                             props.openItem.price.coins,
                                                             props.openItem.id
                                                         )}/>}
                        {diamonds !== '' && <ButtonWithText text={diamonds}
                                                            clickHandler={()=>confirmModal(
                                                                'diamonds',
                                                                props.openItem.price.diamonds,
                                                                props.openItem.id
                                                            )}/>}
                        {money !== '' && <ButtonWithText text={money}
                                                         clickHandler={()=>confirmModal(
                                                             'money',
                                                             props.openItem.price.money,
                                                             props.openItem.id
                                                         )}/>}
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
            props.setModalVisible(false)
            return store.dispatch(setInfoPopup({visible: true, data: {text: `Sorry but you dont have ${type}! play more and then you could buy something =)`}}))
        }
        if(type === 'money'){
            setPaymentBuyRealMoney()
        }

        new C_BUY_GAME_ITEM(type,price,itemId)
        props.setModalVisible(false)
    }

    const getItemImgByType = () =>{
        if(props.type === 'dices'){
            return getCollectionDiceImg(props.openItem.sortIndex)
        }

        return getCollectionSquareImg(props.openItem.sortIndex)
    }

    if(!props.openItem) return null

    return (
        <BuyContainer>
            <SquareImage source={getItemImgByType()}/>

            <Context>
                <Text setShadow={true} large blod center color={'#fff'}>
                    {props.confirmInfo} {props.openItem.name}?
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
  width: 100%;
  margin-top: 10px;
`
const SquareImage = styled.Image`
    margin-top: 10px;
  width: 100px;
  height: 100px;
`

const mapStateToProps = (state) => ({
    confirmInfo: selectTranslation(state,defaultTranslation.TR_COLLECTIONS_CONFIRM_INFO),
    fightOpp: selectTranslation(state,defaultTranslation.TR_FIGHT_OPP),
})

export default connect(mapStateToProps)(ModalChildrenBuy);