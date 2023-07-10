import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import coins from "../../../../../../../assets/topPanel/coins.png";
import diamonds from "../../../../../../../assets/topPanel/diamond.png";
import film from "../../../../../../../assets/result/film-slate.png";
import Text from "../../../../../../common/Text/Text";
import { Animated, Easing, Platform } from "react-native";
import { setTimingAnimated } from "../../../../../../utils/Animation";
import { connect, useDispatch, useSelector } from "react-redux";
import defaultParams from "../../../../../../redux/reducers/language/defaultParams";
import {
  selectDefaultParams,
  selectTranslation,
} from "../../../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../../../redux/reducers/language/defaultTranslation";
import { setEveryDayGiftResult } from "../../../../../../redux/reducers/gifts/GiftsReducer";
import { setEveryDaysGiftPopup } from "../../../../../../redux/reducers/popups/PopupsReducer";
import Sounds, { soundsType } from "../../../../../../utils/Sounds";
import { delay } from "../../../../../../utils/utils";
import AnimatedLottieView from "lottie-react-native";
import coinsAnim from '../../../../../../../assets/animation/lottieAnim/coin-bust.json'

const ButtonsEveryDaysGift = memo((props) => {
  
  const dispatch = useDispatch();

  const [isAnimFinished, setIsAnimFinished] = useState(false)

  const onWatchWideo = () => {
    if (props.isLoaded) {
      Sounds.loadAndPlayFile(soundsType.click2);
      props.show();
    }
  };

  const onContinue = () => {
    Sounds.loadAndPlayFile(soundsType.click2);

    dispatch(setEveryDayGiftResult(null));
    dispatch(setEveryDaysGiftPopup({ visible: false, data: null }));
  };

  const getADBonus = () => {
    setIsAnimFinished(true)

    delay(3000).then(()=>{
      dispatch(setEveryDayGiftResult(null));
      dispatch(setEveryDaysGiftPopup({ visible: false, data: null }));
    })
  };

  React.useEffect(() => {
    if (props.isClosed) {
      getADBonus();
    }
  }, [props.isClosed]);

  const getADButton = () => {
    if (props.isADEveryDayGift && props.isLoaded) {
      return (
        <PlayVideoButtonContainer>
          <PlayVideoButton
            onPress={onWatchWideo}
            activeOpacity={0.9}
            style={{ borderBottomWidth: 5 }}
          >
            <IconVideo
              source={film}
              style={{ transform: [{ rotate: "-20deg" }] }}
            />
            <Text large heavy color={"#000"} center>
              {props.watchVideo}
            </Text>
            <BtnCoins>
              <IconCoins
                source={
                  props.everyDaysGiftsResult.rewardType === "coins"
                    ? coins
                    : diamonds
                }
              />
              <Text setShadow large heavy color={"#fff"}>
                x2
              </Text>
            </BtnCoins>
          </PlayVideoButton>
        </PlayVideoButtonContainer>
      );
    }
  };

  return (
    <ButtonContainer>
      {getADButton()}
      <PlayButton
        onPress={onContinue}
        activeOpacity={0.9}
        style={{ borderBottomWidth: 5 }}
      >
        <Text madium heavy color={"#fff"} center>
          {props.continue}
        </Text>
      </PlayButton>

      {isAnimFinished && 
          <AnimationContainer>
              <AnimatedLottieView source={coinsAnim} loop={false} autoPlay
                                  style={{position: 'absolute', top: 0, bottom: 0, right: 0, width: 350, height: 350}} />
              <AnimatedLottieView source={coinsAnim} loop={false} autoPlay
                                  style={{position: 'absolute', top: 0, bottom: 0, right: 20, width: 250, height: 150}} />
          </AnimationContainer>
        }
    </ButtonContainer>
  );
})

const ButtonContainer = styled(Animated.View)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 20%;
`;

const PlayVideoButtonContainer = styled.View``;

const AnimationContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 500px;
  bottom: 150px;
`;

const PlayButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 50px;
  background-color: #ff9d4d;
  border-radius: 10px;
  border: 1px solid #000;
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
  width: 80%;
  height: 50px;
  margin-top: 20px;
  padding: 0 50px;
`;

const BtnCoins = styled.View`
  position: absolute;
  right: -30px;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
`;

const IconCoins = styled.Image`
  width: 40px;
  height: 40px;
`;
const IconVideo = styled.Image`
  position: absolute;
  bottom: 0;
  left: -30px;
  width: 60px;
  height: 60px;
`;

const mapStateToProps = (state) => ({
  watchVideo: selectTranslation(state, defaultTranslation.TR_WATCH_VIDEO),
  continue: selectTranslation(state, defaultTranslation.TR_CONTINUE),
  isADEveryDayGift: selectDefaultParams(state, defaultParams.ENABLE_AD_EVERY_DAY_GIFT),
  ENABLE_AD_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_PROD),
  ENABLE_AD_ANDROID_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_ANDROID_PROD),
  ENABLE_AD_IOS_PROD: selectDefaultParams( state, defaultParams.ENABLE_AD_IOS_PROD),
});

export default connect(mapStateToProps)(ButtonsEveryDaysGift);
