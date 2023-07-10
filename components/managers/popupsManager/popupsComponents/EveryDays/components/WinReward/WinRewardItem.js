import React, { useEffect, useState } from "react";
import styled from "styled-components";
import coinsLow from "../../../../../../../assets/Gifts/EveryDays/low-coins.png";
import diamondsLow from "../../../../../../../assets/Gifts/EveryDays/low-diamonds.png";
import { setTimingAnimated } from "../../../../../../utils/Animation";
import { Animated, Easing } from "react-native";
import Text from "../../../../../../common/Text/Text";
import AnimatedLottieView from "lottie-react-native";
import coins from '../../../../../../../assets/animation/lottieAnim/coin-bust.json'
import ButtonsEveryDaysGift from "../Buttons/ButtonsEveryDaysGift";
import { selectTranslation } from "../../../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../../../redux/reducers/language/defaultTranslation";
import { useSelector } from "react-redux";

const WinRewardItem = ({everyDaysGiftsResult, isLoaded, isClosed, show}) => {
 
  const congratulate = useSelector(state => selectTranslation(state, defaultTranslation.TR_CONGRATULATE));

  const [isAnimFinished, setCardFinishAnim] = useState(false);

  const winShowValue = React.useRef(new Animated.Value(0)).current;
  const winAnimShow = React.useRef(
    Animated.sequence([
      setTimingAnimated(winShowValue, 0, 100, Easing.ease, true),
      setTimingAnimated(winShowValue, 1, 200, Easing.ease, true),
    ])
  );

  const showTitle = React.useRef(new Animated.Value(0)).current;
  const titleAnimShow = React.useRef(
    Animated.sequence([
      Animated.delay(100),
      setTimingAnimated(showTitle, 0, 300, Easing.ease, true),
      setTimingAnimated(showTitle, 1, 300, Easing.ease, true),
    ])
  );

  const showPrice = React.useRef(new Animated.Value(0)).current;
  const priceAnimShow = React.useRef(
    Animated.sequence([
      Animated.delay(100),
      setTimingAnimated(showPrice, 0, 300, Easing.ease, true),
      setTimingAnimated(showPrice, 1, 300, Easing.ease, true),
    ])
  );

  const titleScale = showTitle.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const priceScale = showPrice.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const showRewardWinTranslate = winShowValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1000, 0],
  });

  const startShowWinAnimation = () => {
    winAnimShow.current.start(({finished}) => {
      if (finished) {
        setCardFinishAnim(true)
        titleAnimShow.current.start();
        priceAnimShow.current.start();
      }
    });
  };

  useEffect(() => {
    startShowWinAnimation();
  }, []);

  return (
    <WinContainer>
        <TitleContainer>
          {isAnimFinished && <AnimContainer style={{ transform: [{ scale: titleScale }]}}>
              <Text setShadow bold title center>{congratulate}</Text>
            </AnimContainer>}
        </TitleContainer>
        

        <CoinsContainer>
          <CoinsImageContainer style={{ transform: [{ translateY: showRewardWinTranslate }]}}>
            <CoinImage source={everyDaysGiftsResult.rewardType === "coins" ? coinsLow : diamondsLow} resizeMode={"contain"} />
          </CoinsImageContainer>

          {isAnimFinished &&  <AnimContainer style={{ transform: [{ scale: priceScale }]}}>
               <Text setShadow large center>  {everyDaysGiftsResult.rewardQuantity || 0} {everyDaysGiftsResult.rewardType || "coins"} </Text>
            </AnimContainer>}
        </CoinsContainer>
       
        <ButtonContainer>
          {isAnimFinished && <ButtonsEveryDaysGift everyDaysGiftsResult={everyDaysGiftsResult} isLoaded={isLoaded} isClosed={isClosed} show={show}/>}
        </ButtonContainer>

        {isAnimFinished && 
          <>
            <AnimatedLottieView source={coins} loop={false} autoPlay
                                  style={{position: 'absolute', top: 50, bottom: 0, right: 0, width: 300, height: 300}} />
              <AnimatedLottieView source={coins} loop={false} autoPlay
                                  style={{position: 'absolute', top: 150, bottom: 0, right: 0, width: 350, height: 350}} />
              <AnimatedLottieView source={coins} loop={false} autoPlay
                                  style={{position: 'absolute', top: 100, bottom: 0, right: 0, width: 250, height: 150}} />
          </>
        }
    </WinContainer>
  );
};

const WinContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  z-index: 0;
`;

const CoinsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
  z-index: 0;
`;

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  z-index: 1;
`;

const AnimContainer = styled(Animated.View)`

`;

const CoinsImageContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
`;

const CoinImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default WinRewardItem;
