import styled from "styled-components";
import Text from "../../common/Text/Text";
import {connect, useSelector} from "react-redux";
import {selectResultGame, setCountScores} from "../../redux/reducers/game/GameReducer";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {selectCurrentUserId} from "../../redux/reducers/players/PlayersReducer";
import BackgroundWrapper from "../../common/BackgroundWrapper/BackgroundWrapper";
import {store} from "../../redux/redux-store";
import Winner from "./components/Winner";
import Loser from "./components/Loser";
import {Animated, Easing, Platform} from "react-native";
import { setTimingAnimated } from "../../utils/Animation";
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import {resetCountShowAd, setCountShowAd} from "../../redux/reducers/AD/AdvertisingReducer";
import {selectDefaultParams, selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {setActiveTabApp} from "../../redux/reducers/Websocket/WebsocketReducer";
import coinsAnim from "../../../assets/animation/lottieAnim/confetti.json";
import AnimatedLottieView from "lottie-react-native";
import Sounds, {soundsType} from "../../utils/Sounds";
import defaultParams from "../../redux/reducers/language/defaultParams";

const ResultScreen = (props) => {

    const AdUnitID = Platform.OS === 'ios'
        ? process.env.APP_TYPE !== 'development' && props.ENABLE_AD_PROD && props.ENABLE_AD_IOS_PROD ? 'ca-app-pub-6421975370931679~2323680627' : TestIds.INTERSTITIAL
        : process.env.APP_TYPE !== 'development' && props.ENABLE_AD_PROD && props.ENABLE_AD_ANDROID_PROD ? 'ca-app-pub-6421975370931679/4342087577' : TestIds.INTERSTITIAL

    const advertising = useSelector(state => state.advertising)
    const { isLoaded, isClosed, load, show } = useInterstitialAd(AdUnitID, {
        requestNonPersonalizedAdsOnly: true,
    });
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()

    const hendlerCloseResult = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        if (props.ENABLE_AD_AFTER_GAME && isLoaded && advertising.countShowless === advertising.numberCanMissGameAd) {
            show();
        } else {
            navigation.navigate('MainScreen')
            store.dispatch(setActiveTabApp('MainScreen'))
            store.dispatch(setCountScores(null))
            store.dispatch(setCountShowAd())
        }
    }

	const animateWinerText = () => {
		Animated.sequence([
			setTimingAnimated(animatedValue, 1.2, 500, Easing.ease),
			setTimingAnimated(animatedValue, 1, 600, Easing.ease),
		]).start();
	}

    const getWinner = (winner) =>{
        return <Winner winner={winner} userId={props.userId}/>
    }

    const getLoser = (loser) => {
        return <Loser loser={loser} userId={props.userId}/>
    }

    const renderResult = () =>{
        const userData = {
            player: props.result.players.find(user => +user.id === +props.userId),
            items: props.result.userResultItems
        }
        const opponentData = {
            player: props.result.players.find(user => +user.id !== +props.userId),
            items: props.result.opponentResultItems
        }
        const Winner = props.result.userWin ? userData : opponentData
        const Loser = !props.result.userWin ? userData : opponentData

        return (
            <Result>
                <TitleContainer style={{ 
                    borderBottomWidth: 5,
                    opacity: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    }),
                    transform: [
                        {
                            scale: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1]
                            })
                        }
                    ]
                }}>
                    <TitleText title heavy color={'#fff'}>{props.result.userWin ? props.winText : props.loseText}</TitleText>
                </TitleContainer>

                {getWinner(Winner)}
                {getLoser(Loser)}
                {Winner.player.id === props.userId &&
                    <AnimatedLottieView loop={false} autoPlay source={coinsAnim} style={{/*width: 300, height: 300*/}}/>}
            </Result>
        )
    }

    React.useEffect(() => {
        animateWinerText();
	  return () => {}
	}, [])

    React.useEffect(() => {
        load();
    }, [load]);

    React.useEffect(() => {
        if (isClosed) {
            navigation.navigate('MainScreen')
            store.dispatch(setActiveTabApp('MainScreen'))
            store.dispatch(setCountScores(null))
            store.dispatch(resetCountShowAd())
        }
    }, [isClosed, navigation]);

    return (
        <BackgroundWrapper>
            <ResultContainer>
                {renderResult()}
                {}
                <PlayButton onPress={hendlerCloseResult} style={{ borderBottomWidth: 5 }}>
                    <Text large heavy color={'#fff'}>{props.continue}</Text>
                </PlayButton>
            </ResultContainer>
        </BackgroundWrapper>

    )
}


const ResultContainer = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`

const TitleContainer = styled(Animated.View)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 60%;
    height: 60px;
    margin-bottom: 100px;
    border-radius: 15px;
    background-color: #e63349;
    border: 2px solid #a61429;
`

const TitleText = styled(Text)`
    text-shadow: 4px 4px 6px rgba(66, 68, 90, 1);
`
const Result = styled.View`
  align-items: center;
  flex-direction: column;
  width: 100%;
`
const PlayButton = styled.TouchableOpacity`
  background-color: #ff9d4d;
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 50px;
  margin-top: 20px;
`;

const mapStateToProps = (state) => ({
    userId: selectCurrentUserId(state),
    result: selectResultGame(state),
    winText: selectTranslation(state, defaultTranslation.TR_YOU_WIN),
    loseText: selectTranslation(state, defaultTranslation.TR_YOU_LOSE),
    continue: selectTranslation(state, defaultTranslation.TR_CONTINUE),
    ENABLE_AD_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_PROD),
    ENABLE_AD_IOS_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_IOS_PROD),
    ENABLE_AD_ANDROID_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_ANDROID_PROD),
    ENABLE_AD_AFTER_GAME: selectDefaultParams(state, defaultParams.ENABLE_AD_AFTER_GAME),
});

export default connect(mapStateToProps)(ResultScreen);