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
import { Animated, Easing } from "react-native";
import { setTimingAnimated } from "../../utils/Animation";
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import {resetCountShowAd, setCountShowAd} from "../../redux/reducers/AD/AdvertisingReducer";
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {setActiveTabApp} from "../../redux/reducers/Websocket/WebsocketReducer";

const ResultScreen = (props) => {

    const advertising = useSelector(state => state.advertising)
    const { isLoaded, isClosed, load, show } = useInterstitialAd(TestIds.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: true,
    });
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()

    const hendlerCloseResult = () => {
        if (isLoaded && advertising.countShowless === advertising.numberCanMissGameAd) {
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
        return <Winner winner={winner}/>
    }

    const getLoser = (loser) => {
        return <Loser loser={loser}/>
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
});

export default connect(mapStateToProps)(ResultScreen);