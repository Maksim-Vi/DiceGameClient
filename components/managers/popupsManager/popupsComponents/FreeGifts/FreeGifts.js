import React, {useEffect} from "react";
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
import {Animated, Easing} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";

const FreeGifts = (props) => {

    const congratulate = useSelector(state => selectTranslation(state, defaultTranslation.TR_CONGRATULATE))
    const congratulateText = useSelector(state => selectTranslation(state, defaultTranslation.TR_NEWS_FREE_GIFT_CONGRATULATE_TEXT))
    const coinsText = useSelector(state => selectTranslation(state, defaultTranslation.TR_COINS))
    const diamondsText = useSelector(state => selectTranslation(state, defaultTranslation.TR_DIAMONDS))
    const claim = useSelector(state => selectTranslation(state, defaultTranslation.TR_CLAIM))

    const showImage = React.useRef(new Animated.Value(0)).current;
    const showText = React.useRef(new Animated.Value(0)).current;
    const showBtns = React.useRef(new Animated.Value(0)).current;

    const ImageAnimShow = React.useRef(
        Animated.sequence([
            setTimingAnimated(showImage, 0, 300, Easing.ease, false),
            setTimingAnimated(showImage, 1, 500, Easing.ease, false),
        ])
    );

    const TextAnimShow = React.useRef(
        Animated.sequence([
            Animated.delay(200),
            setTimingAnimated(showText, 0, 300, Easing.bounce, false),
            setTimingAnimated(showText, 1, 500, Easing.bounce, false),
        ])
    );

    const BtnsAnimShow = React.useRef(
        Animated.sequence([
            Animated.delay(200),
            setTimingAnimated(showBtns, 0, 300, Easing.bounce, false),
            setTimingAnimated(showBtns, 1, 500, Easing.bounce, false),
        ])
    );

    const imageScale = showImage.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const TextScale = showText.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const BtnScale = showBtns.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const getImageByType = () =>{
        if(props.freeGift.data.type){
            switch (props.freeGift.data.type) {
                case newsActionsTypes.Coins:{
                    return <ImageContainer style={{ transform: [{ scale: imageScale }]}}>
                        <GiftImage source={coins} resizeMode={"contain"} />
                    </ImageContainer>
                }
                case newsActionsTypes.Diamonds:{
                    return <ImageContainer style={{ transform: [{ scale: imageScale }]}}>
                        <GiftImage source={diamonds} resizeMode={"contain"} />
                    </ImageContainer>
                }
                case newsActionsTypes.CoinsDiamonds:{
                    return <ImageContainer style={{ transform: [{ scale: imageScale }]}}>
                        <GiftImage source={combiCoinsDiamonds} resizeMode={"contain"} />
                    </ImageContainer>
                }
                case newsActionsTypes.ItemsCoins:{
                    return <ImageContainer style={{ transform: [{ scale: imageScale }]}}>
                        <GiftImage source={itemsWithCoins} resizeMode={"contain"} />
                    </ImageContainer>
                }
                default: return null
            }
        }
    }

    const getPriceByType = () =>{
        if(props.freeGift.data.type){
            switch (props.freeGift.data.type) {
                case newsActionsTypes.Coins:{
                    return <PriceContainer style={{ transform: [{ scale: TextScale }]}}>
                        <Price>
                            <Text setShadow large heavy center>{coinsText} </Text>
                            <Text setShadow title color={'rgba(208,109,55,0.84)'} heavy center> {props.freeGift.data.coins}</Text>
                        </Price>
                    </PriceContainer>
                }
                case newsActionsTypes.Diamonds:{
                    return  <PriceContainer style={{ transform: [{ scale: TextScale }]}}>
                        <Price>
                            <Text setShadow large heavy center>{diamondsText}: </Text>
                            <Text setShadow title color={'rgba(208,109,55,0.84)'} heavy center> {props.freeGift.data.diamonds}</Text>
                        </Price>
                    </PriceContainer>
                }
                case newsActionsTypes.CoinsDiamonds:{
                    return <PriceContainer style={{ transform: [{ scale: TextScale }]}}>
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
                    return <PriceContainer style={{ transform: [{ scale: TextScale }]}}>
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

    useEffect(()=>{
        ImageAnimShow.current.start((data)=>{
            if(data.finished){
                TextAnimShow.current.start((data)=>{
                    if(data.finished){
                        BtnsAnimShow.current.start()
                    }
                })
            }
        })
    })

    return (
        <ModalWrapper modalBG={"bg_black"} modalVisible={true}>
            <Container>
                <ContentContainer>
                    <TextContainer style={{ transform: [{ scale: TextScale }]}}>
                        <Title>
                            <Text setShadow title heavy center>{congratulate}!</Text>
                        </Title>
                        <Text setShadow large heavy center>{congratulateText}!</Text>
                    </TextContainer>

                    {getImageByType()}

                    {getPriceByType()}
                    <ButtonContainer style={{ transform: [{ scale: BtnScale }]}}>
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
const PriceContainer =  styled(Animated.View)`
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

const TextContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 20%;
`
const ButtonContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
`

const ImageContainer =styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

const Title = styled.View`
  margin-bottom: 20px;
`

const GiftImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const mapStateToProps = (state) => ({
    user: selectMyUser(state),
    freeGift: selectFreeGiftsPopup(state),
});

export default connect(mapStateToProps)(FreeGifts);
