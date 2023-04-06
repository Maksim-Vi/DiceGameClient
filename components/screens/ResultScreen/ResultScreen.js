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
import coinsAnim from "../../../assets/animation/lottieAnim/confetti.json";
import AnimatedLottieView from "lottie-react-native";
import Sounds, {soundsType} from "../../utils/Sounds";
import defaultParams from "../../redux/reducers/language/defaultParams";
import {transitionState} from "../../utils/utils";
import coins from '../../../assets/topPanel/coins.png'
import film from '../../../assets/result/film-slate.png'
import {getADX2CoinsBonus} from "../../protocol/API/API";

const ResultScreen = (props) => {

    const AdUnitID = Platform.OS === 'ios'
        ? process.env.APP_TYPE !== 'development' && props.ENABLE_AD_PROD && props.ENABLE_AD_IOS_PROD ? 'ca-app-pub-6421975370931679~2323680627' : TestIds.INTERSTITIAL
        : process.env.APP_TYPE !== 'development' && props.ENABLE_AD_PROD && props.ENABLE_AD_ANDROID_PROD ? 'ca-app-pub-6421975370931679/4342087577' : TestIds.INTERSTITIAL

    const { isLoaded, isClosed, load, show } = useInterstitialAd(AdUnitID, {
        requestNonPersonalizedAdsOnly: true,
    });
    const advertising = useSelector(state => state.advertising)
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const animatedVideoBtnValue = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()

    const handlerCloseResult = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        transitionState('MainScreen')
        store.dispatch(setCountScores(null))
        store.dispatch(setCountShowAd())
    }

    const handlerWatch = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        if (isLoaded) {
            show();
        } else {
            transitionState('MainScreen')
            store.dispatch(setCountScores(null))
            store.dispatch(setCountShowAd())
        }
    }

    const getADBonus = async () =>{
        if(props.userId && props.result.userResultItems.coins){
            await getADX2CoinsBonus(props.userId, props.result.userResultItems.coins)
        }
        transitionState('MainScreen')
        store.dispatch(setCountScores(null))
        store.dispatch(resetCountShowAd())
    }

	const animateWinnerText = () => {
		Animated.sequence([
			setTimingAnimated(animatedValue, 1.2, 500, Easing.ease),
			setTimingAnimated(animatedValue, 1, 600, Easing.ease),
		]).start();
	}

    const animateVideoBtn = () => {
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(animatedVideoBtnValue, 0, 600, Easing.bounce),
                setTimingAnimated(animatedVideoBtnValue, 1, 2000, Easing.bounce),
                setTimingAnimated(animatedVideoBtnValue, 0, 600, Easing.ease),
            ])
        ).start();
	}

    const getWinner = (winner) =>{
        if(winner){
            return <Winner winner={winner} userId={props.userId}/>
        }
    }

    const getLoser = (loser) => {
        if(loser){
            return <Loser loser={loser} userId={props.userId}/>
        }
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

    const getADButton = () =>{

        const myUser = props.result.players.find(user => +user.id === +props.userId)

        if( props.ENABLE_AD_AFTER_GAME &&
            isLoaded &&
            props.result.userWin &&
            myUser?.id === props.userId &&
            advertising.countShowless >= advertising.numberCanMissGameAd
        ){
            animateVideoBtn()
            return  <PlayVideoButtonContainer style={{
                transform: [
                    {
                        scale: animatedVideoBtnValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.95, 1]
                        })
                    }
                ]
            }}>
                <PlayVideoButton onPress={handlerWatch} style={{borderBottomWidth: 5}}>
                    <IconVideo source={film} style={{ transform: [{rotate: '-20deg'}]}} />
                    <Text large heavy color={'#000'}>{props.watchVideo}</Text>
                    <BtnCoins>
                        <IconCoins source={coins} />
                        <Text setShadow large heavy color={'#fff'}>x2</Text>
                    </BtnCoins>
                </PlayVideoButton>
            </PlayVideoButtonContainer>
        }
    }

    React.useEffect(() => {
        animateWinnerText();
	  return () => {}
	}, [])

    React.useEffect(() => {
        load();
    }, [load]);

    React.useEffect(() => {
        if (isClosed) {
            getADBonus()
        }
    }, [isClosed, navigation]);

    return (
        <BackgroundWrapper>
            <ResultContainer>
                {renderResult()}

                <ButtonContainer>
                    {getADButton()}
                    <PlayButton onPress={handlerCloseResult} style={{ borderBottomWidth: 5 }}>
                        <Text large heavy color={'#fff'}>{props.continue}</Text>
                    </PlayButton>
                </ButtonContainer>
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

const ButtonContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const TitleText = styled(Text)`
    text-shadow: 4px 4px 6px rgba(66, 68, 90, 1);
`
const Result = styled.View`
  align-items: center;
  flex-direction: column;
  width: 100%;
`
const PlayVideoButtonContainer = styled(Animated.View)`
`

const PlayButton = styled.TouchableOpacity`
  background-color: #ff9d4d;
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 50px;
  margin-top: 20px;
`;

const PlayVideoButton = styled.TouchableOpacity`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: #87e769;
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 50px;
  margin-top: 20px;
  height: 60px;
`;

const BtnCoins = styled.View`
  position: absolute;
  right: -30px;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
`

const IconCoins = styled.Image`
  width: 40px;
  height: 40px;
`
const IconVideo = styled.Image`
  position: absolute;
  bottom: 0;
  left: -30px;
  width: 60px;
  height: 60px;
`

const mapStateToProps = (state) => ({
    userId: selectCurrentUserId(state),
    result: selectResultGame(state),
    watchVideo: selectTranslation(state, defaultTranslation.TR_WATCH_VIDEO),
    winText: selectTranslation(state, defaultTranslation.TR_YOU_WIN),
    loseText: selectTranslation(state, defaultTranslation.TR_YOU_LOSE),
    continue: selectTranslation(state, defaultTranslation.TR_CONTINUE),
    ENABLE_AD_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_PROD),
    ENABLE_AD_IOS_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_IOS_PROD),
    ENABLE_AD_ANDROID_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_ANDROID_PROD),
    ENABLE_AD_AFTER_GAME: selectDefaultParams(state, defaultParams.ENABLE_AD_AFTER_GAME),
});

export default connect(mapStateToProps)(ResultScreen);