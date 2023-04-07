import React, {useEffect} from 'react';
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import styled from "styled-components";
import ButtonWithText from "../../../../common/Buttons/ButtonWithText";
import {setCollectItemPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {connect, useDispatch} from "react-redux";
import Text from "../../../../common/Text/Text";
import speans from '../../../../../assets/animation/speans.png'
import sunRaye from '../../../../../assets/animation/sun-rays2.png'
import {Animated, Easing, useWindowDimensions} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";
import {getCollectionDiceImg, getCollectionSquareImg} from "../../../../utils/utils";
import AnimatedLottieView from "lottie-react-native";
import Anim from "../../../../../assets/animation/lottieAnim/gold-stars-v2.json";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import C_SET_ACTIVE_GAME_ITEM from "../../../../protocol/messages/clients/collections/C_SET_ACTIVE_GAME_ITEM";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const CollectItemPopup = props => {

    const dispatch = useDispatch()
    const {width, height} = useWindowDimensions()
    const showValue = React.useRef(new Animated.Value(0)).current;
    const spinValue = React.useRef(new Animated.Value(0)).current;
    const spinValue2 = React.useRef(new Animated.Value(0)).current;
    const show = showValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 2]
    })
    const spinSunRaye = spinValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0deg', '360deg', '0deg']
    })
    const spinSpeans = spinValue2.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0deg', '-360deg', '0deg']
    })

    const startShow = () =>{
        Animated.sequence([
            setTimingAnimated(showValue, 1, 1000, Easing.linear, true),
        ]).start(()=>{
            startSpin1()
            startSpin2()
        });
    }

    const startSpin1 = () =>{
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(spinValue, 1, 20000, Easing.linear, true),
            ])
        ).start();
    }

    const startSpin2 = () =>{
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(spinValue2, 1, 20000, Easing.linear, true),
            ])
        ).start();
    }

    const getCollectionItem = () =>{
        let imgItem = null
        if(props.data.type === 'dices'){
            imgItem = getCollectionDiceImg(props.data, props.data.id)
        } else {
            imgItem = getCollectionSquareImg(props.data, props.data.id)
        }

        return <Image source={imgItem}/>
    }

    const selectItem = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        new C_SET_ACTIVE_GAME_ITEM(props.data.type,props.data.id)
        dispatch(setCollectItemPopup({visible: false, data: null}))
    }

    const closePopup = () => {
        dispatch(setCollectItemPopup({visible: false, data: null}))
    }

    useEffect(() => {
        startShow()

        return ()=>{
            showValue.stopAnimation()
            spinValue.stopAnimation()
            spinValue2.stopAnimation()
        }
    },[]);

    return (
        <ModalWrapper modalBG={'bg_black'} width={width} height={height} modalVisible={true}>
            <Container>
                <TopContent>
                    <Title title heavy center>{props.congratulateTag}!</Title>
                    <Text large blod center>{props.collectItemText}</Text>
                </TopContent>

                <Content>
                    <SunRaye source={sunRaye} resizeMode="contain" style={{transform: [{scale: show},{rotate: spinSunRaye}]}}/>
                    <Speans source={speans} resizeMode="contain" style={{transform: [{scale: show},{rotate: spinSpeans}]}}/>
                    <ItemContainer>
                        {getCollectionItem()}
                    </ItemContainer>
                    <AnimatedLottieView loop={true} autoPlay source={Anim} style={{width: 120, height: 140}}/>
                </Content>

                <BottomText>
                    <Text large blod center>{props.playMoreText}</Text>
                </BottomText>

                <ButtonContainer>
                    <ButtonWithText width={'150px'}
                                    text={props.selectTag}
                                    clickHandler={selectItem}/>
                    <ButtonWithText width={'150px'}
                                    text={props.continueTag}
                                    color={'#42bad5'}
                                    clickHandler={closePopup}/>
                </ButtonContainer>

            </Container>
        </ModalWrapper>
    );
};

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`

const TopContent = styled.View`
  display: flex;
  align-items: center;
`

const Content = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const ItemContainer = styled.View`
  position: absolute;
  top: 50px;
`

const SunRaye = styled(Animated.Image)`
  position: absolute;
  top: 0;
  opacity: 0.3;

`
const Speans = styled(Animated.Image)`
  position: absolute;
  top: 50px;
  opacity: 0.4;
`

const BottomText = styled.View`
`

const Image = styled.Image`
  width: 100px;
  height: 100px;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const Title = styled(Text)`
`

const mapStateToProps = (state) => ({
    congratulateTag: selectTranslation(state,defaultTranslation.TR_CONGRATULATE),
    collectItemText: selectTranslation(state,defaultTranslation.TR_YOU_COLLECT_ITEM),
    playMoreText: selectTranslation(state,defaultTranslation.TR_PLAY_MORE_COLLECTION_DESC),
    selectTag: selectTranslation(state,defaultTranslation.TR_SELECT),
    continueTag: selectTranslation(state,defaultTranslation.TR_CONTINUE),
})

export default connect(mapStateToProps)(CollectItemPopup);