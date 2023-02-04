import React from 'react';
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {Animated, Easing} from "react-native";
import {selectLevelUpPopup, setLevelUpPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {connect, useDispatch} from "react-redux";
import Text from "../../../common/Text/Text";
import ButtonWithText from "../../../common/Buttons/ButtonWithText";
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import styled from "styled-components";
import {setTimingAnimated} from "../../../utils/Animation";
import coinsAnim from "../../../../assets/animation/lottieAnim/nextLvl.json";
import AnimatedLottieView from "lottie-react-native";
import Sounds, {soundsType} from "../../../utils/Sounds";

const LevelUpPopup = (props) => {

    const animatedTitle = React.useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch()

    const animateTitle = () => {
        Animated.sequence([
            Animated.delay(500),
            setTimingAnimated(animatedTitle, 1.1, 500, Easing.ease),
            setTimingAnimated(animatedTitle, 1, 400, Easing.ease),
        ]).start();
    }


    const textTitleRender = () =>{
        return (
            <TitleContainer style={{
                opacity: animatedTitle.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
                transform: [
                    {
                        scale: animatedTitle.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        })
                    }
                ]
            }}>
                <Text title heavy>{props.congrat}</Text>
                <Text large heavy>{props.lvlUpped}</Text>
            </TitleContainer>
        )
    }

    const starRender = () =>{
        return (
            <StarContainer>
                <Lvl><Text title heavy center>{props.lvlUp.data.newLvl}</Text></Lvl>
                <AnimatedLottieView loop={false} autoPlay source={coinsAnim} style={{width: 300, height: 300}}/>
            </StarContainer>
        )
    }

    const closeModal = () =>{
        dispatch(setLevelUpPopup({visible: false, data: null}))
    }

    React.useEffect(()=>{
        Sounds.loadAndPlayFile(soundsType.LvlUp)
        animateTitle()
    },[])

    return <ModalWrapper modalBG={'bg_black'} modalVisible={true}>
        <LvlContainer>
            {textTitleRender()}
            {starRender()}
            <ButtonWithText text={props.continue} clickHandler={closeModal} width={'50%'} height={'40px'}/>
        </LvlContainer>
    </ModalWrapper>
}

const LvlContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60%;
`

const StarContainer = styled(Animated.View)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
  text-align: center;
`

const Lvl = styled.View`
  position: absolute;
  z-index: 1;
`

const mapStateToProps = (state) => ({
    lvlUp: selectLevelUpPopup(state),
    continue: selectTranslation(state, defaultTranslation.TR_CONTINUE),
    congrat: selectTranslation(state, defaultTranslation.TR_CONGRATULATE),
    lvlUpped: selectTranslation(state, defaultTranslation.TR_LEVEL_UPPED),

})

export default connect(mapStateToProps)(LevelUpPopup);