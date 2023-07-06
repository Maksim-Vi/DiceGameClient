import React, { useEffect } from "react";
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
import {
  TestIds,
  useRewardedInterstitialAd,
} from "react-native-google-mobile-ads";
import { selectMyUser } from "../../../../../../redux/reducers/players/PlayersReducer";

const ButtonsEveryDaysGift = (props) => {
  
  const user = useSelector(selectMyUser)
  const dispatch = useDispatch();

  const AdUnitID =
    Platform.OS === "ios"
      ? process.env.APP_TYPE !== "development" && props.ENABLE_AD_PROD &&  props.ENABLE_AD_IOS_PROD
        ? "ca-app-pub-6421975370931679/3970578445"
        : TestIds.REWARDED_INTERSTITIAL
      : process.env.APP_TYPE !== "development" && props.ENABLE_AD_PROD && props.ENABLE_AD_ANDROID_PROD
        ? "ca-app-pub-6421975370931679~3130555324"
        : TestIds.REWARDED_INTERSTITIAL;

  const { isLoaded, isClosed, load, show, isEarnedReward, error } =
    useRewardedInterstitialAd(AdUnitID, {
      requestNonPersonalizedAdsOnly: true,
      serverSideVerificationOptions: {
        userId: String(user.id),
        customData: JSON.stringify({username: user.username,reward: 2,rewardType:  props.everyDaysGiftsResult.rewardType, rewardQuantity:  props.everyDaysGiftsResult.rewardQuantity}),
      },
    });

  const showBtn = React.useRef(new Animated.Value(0)).current;
  const btnAnimShow = React.useRef(
    Animated.sequence([
      Animated.delay(1000),
      setTimingAnimated(showBtn, 0, 300, Easing.ease, true),
      setTimingAnimated(showBtn, 1, 300, Easing.ease, true),
    ])
  );

  const btnScale = showBtn.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const loadBtns = () => {
    btnAnimShow.current.start();
  };

  const onWatchWideo = () => {
    Sounds.loadAndPlayFile(soundsType.click2);
    if (isLoaded) {
      show();
    } else {
      load();
    }

    dispatch(setEveryDayGiftResult(null));
    dispatch(setEveryDaysGiftPopup({ visible: false, data: null }));
  };

  const onContinue = () => {
    Sounds.loadAndPlayFile(soundsType.click2);

    dispatch(setEveryDayGiftResult(null));
    dispatch(setEveryDaysGiftPopup({ visible: false, data: null }));
  };

  const getADBonus = () => {
    dispatch(setEveryDayGiftResult(null));
    dispatch(setEveryDaysGiftPopup({ visible: false, data: null }));
  };

  useEffect(() => {
    loadBtns();
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    if (isClosed) {
      getADBonus();
    }
  }, [isClosed]);

  const getADButton = () => {
    if (props.isADEveryDayGift && isLoaded) {
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
            <Text large heavy color={"#000"}>
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
    <ButtonContainer style={{ transform: [{ scale: btnScale }] }}>
      {getADButton()}
      <PlayButton
        onPress={onContinue}
        activeOpacity={0.9}
        style={{ borderBottomWidth: 5 }}
      >
        <Text large heavy color={"#fff"}>
          {props.continue}
        </Text>
      </PlayButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20%;
`;

const PlayVideoButtonContainer = styled.View``;

const PlayButton = styled.TouchableOpacity`
  background-color: #ff9d4d;
  border-radius: 10px;
  border: 1px solid #000;
  padding: 15px 60px;
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
  padding: 15px 50px;
  margin-top: 20px;
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
  isADEveryDayGift: selectDefaultParams(
    state,
    defaultParams.ENABLE_AD_EVERY_DAY_GIFT
  ),
  ENABLE_AD_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_PROD),
  ENABLE_AD_ANDROID_PROD: selectDefaultParams(
    state,
    defaultParams.ENABLE_AD_ANDROID_PROD
  ),
  ENABLE_AD_IOS_PROD: selectDefaultParams(
    state,
    defaultParams.ENABLE_AD_IOS_PROD
  ),
});

export default connect(mapStateToProps)(ButtonsEveryDaysGift);
