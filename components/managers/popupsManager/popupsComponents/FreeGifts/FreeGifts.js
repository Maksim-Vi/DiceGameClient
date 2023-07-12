import React from "react";
import styled from "styled-components";
import {connect, useSelector} from "react-redux";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import { selectMyUser } from "../../../../redux/reducers/players/PlayersReducer";
import {selectFreeGiftsPopup, setFreeGiftsPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import coins from "../../../../../assets/Gifts/free/Coins.png";
import diamonds from "../../../../../assets/Gifts/free/Diamonds.png";
import combiCoinsDiamonds from "../../../../../assets/Gifts/free/combiCoinsDiamonds.png";
import itemsWithCoins from "../../../../../assets/Gifts/free/ItemsWithCoins.png";
import {newsActionsTypes} from "../../../../screens/News/NewsActions";
import {store} from "../../../../redux/redux-store";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import Text from "../../../../common/Text/Text";
import ButtonWithText from "../../../../common/Buttons/ButtonWithText";
import {transitionState} from "../../../../utils/utils";

const FreeGifts = (props) => {

    const congratulate = useSelector(state => selectTranslation(state, defaultTranslation.TR_CONGRATULATE))
    const congratulateText = useSelector(state => selectTranslation(state, defaultTranslation.TR_NEWS_FREE_GIFT_CONGRATULATE_TEXT))
    const coinsText = useSelector(state => selectTranslation(state, defaultTranslation.TR_COINS))
    const diamondsText = useSelector(state => selectTranslation(state, defaultTranslation.TR_DIAMONDS))
    const claim = useSelector(state => selectTranslation(state, defaultTranslation.TR_CLAIM))
    const getImageByType = () =>{
        if(props.freeGift.data.type){
            switch (props.freeGift.data.type) {
                case newsActionsTypes.Coins:{
                    return <GiftImage source={coins} resizeMode={"contain"} />
                }
                case newsActionsTypes.Diamonds:{
                    return <GiftImage source={diamonds} resizeMode={"contain"} />
                }
                case newsActionsTypes.CoinsDiamonds:{
                    return <GiftImage source={combiCoinsDiamonds} resizeMode={"contain"} />
                }
                case newsActionsTypes.ItemsCoins:{
                    return <GiftImage source={itemsWithCoins} resizeMode={"contain"} />
                }
                default: return null
            }
        }
    }

    const getPriceByType = () =>{
        if(props.freeGift.data.type){
            switch (props.freeGift.data.type) {
                case newsActionsTypes.Coins:{
                    return <PriceContainer>
                        <Price>
                            <Text setShadow large heavy center>{coinsText} </Text>
                            <Text setShadow title color={'rgba(208,109,55,0.84)'} heavy center> {props.freeGift.data.coins}</Text>
                        </Price>
                    </PriceContainer>
                }
                case newsActionsTypes.Diamonds:{
                    return  <PriceContainer>
                        <Price>
                            <Text setShadow large heavy center>{diamondsText}: </Text>
                            <Text setShadow title color={'rgba(208,109,55,0.84)'} heavy center> {props.freeGift.data.diamonds}</Text>
                        </Price>
                    </PriceContainer>
                }
                case newsActionsTypes.CoinsDiamonds:{
                    return <PriceContainer>
                        <Price>
                            <Text setShadow large heavy center>{coinsText}: </Text>
                            <Text setShadow title color={'rgba(208,109,55,0.84)'} heavy center> {props.freeGift.data.coins}</Text>
                        </Price>

                        <Price>
                            <Text setShadow large heavy center>{diamondsText}: </Text>
                            <Text setShadow title color={'rgba(208,109,55,0.84)'} heavy center> {props.freeGift.data.diamonds}</Text>
                        </Price>
                    </PriceContainer>
                }
                case newsActionsTypes.ItemsCoins:{
                    return <PriceContainer>
                        <Price>
                            <Text setShadow large heavy center>{coinsText}: </Text>
                            <Text setShadow title color={'rgba(208,109,55,0.84)'} heavy center> {props.freeGift.data.coins}</Text>
                        </Price>

                        <Price>
                            <Text setShadow large heavy center>{diamondsText}: </Text>
                            <Text setShadow title color={'rgba(208,109,55,0.84)'} heavy center> {props.freeGift.data.diamonds}</Text>
                        </Price>
                    </PriceContainer>
                }
                default: return null
            }
        }
    }

    const closePopup = () =>{
        store.dispatch(setFreeGiftsPopup({visible: false, data: null}))
    }

    return (
        <ModalWrapper modalBG={"bg_black"} modalVisible={true}>
            <Container>
                <ContentContainer>
                    <TextContainer>
                        <Title>
                            <Text setShadow title heavy center>{congratulate}!</Text>
                        </Title>
                        <Text setShadow large heavy center>{congratulateText}!</Text>
                    </TextContainer>

                    {getImageByType()}

                    {getPriceByType()}
                    <ButtonContainer>
                        <ButtonWithText width={'50%'}
                                        height={'50px'}
                                        text={claim}
                                        clickHandler={closePopup}/>
                    </ButtonContainer>
                </ContentContainer>

            </Container>
        </ModalWrapper>
    );
}

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const ContentContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70%;
`
const PriceContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 80%;
  margin-bottom: 50px;
`

const Price = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`

const TextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
`

const Title = styled.View`
  margin-bottom: 20px;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const GiftImage = styled.Image`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
`;

const mapStateToProps = (state) => ({
    user: selectMyUser(state),
    freeGift: selectFreeGiftsPopup(state),
});

export default connect(mapStateToProps)(FreeGifts);
