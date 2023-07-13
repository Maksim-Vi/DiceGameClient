import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import card from "../../../../../../../assets/Gifts/EveryDatsGiftCard.png";
import { setTimingAnimated } from "../../../../../../utils/Animation";
import { Animated, Easing, Platform } from "react-native";
import WinRewardItem from "./WinRewardItem";
import { TestIds, useRewardedInterstitialAd } from "react-native-google-mobile-ads";

const WinReward = memo(function ({
  everyDaysGiftsResult,
  ENABLE_AD_PROD,
  ENABLE_AD_IOS_PROD,
  ENABLE_AD_ANDROID_PROD,
  user,
}) {
  const AdUnitID =
    Platform.OS === "ios"
      ? process.env.APP_TYPE !== "development" &&
        ENABLE_AD_PROD &&
        ENABLE_AD_IOS_PROD
        ? "ca-app-pub-6421975370931679/5405188852"
        : TestIds.REWARDED_INTERSTITIAL
      : process.env.APP_TYPE !== "development" &&
        ENABLE_AD_PROD &&
        ENABLE_AD_ANDROID_PROD
      ? "ca-app-pub-6421975370931679/9955905438"
      : TestIds.REWARDED_INTERSTITIAL;

  const { isLoaded, isClosed, load, show } = useRewardedInterstitialAd(
    AdUnitID,
    {
      requestNonPersonalizedAdsOnly: true,
      serverSideVerificationOptions: {
        userId: String(user.id),
        customData: JSON.stringify({
          username: user.username,
          rewardType: everyDaysGiftsResult.rewardType,
          rewardQuantity: everyDaysGiftsResult.rewardQuantity,
        }),
      },
    }
  );

  const [isCardAnimFinished, setCardFinishAnim] = useState(false);

  const showValue = React.useRef(new Animated.Value(0)).current;
  const animShow = React.useRef(
    Animated.sequence([
      setTimingAnimated(showValue, 0, 300, Easing.ease, false),
      setTimingAnimated(showValue, 1, 300, Easing.ease, false),
      setTimingAnimated(showValue, 2, 250, Easing.ease, false),
      setTimingAnimated(showValue, 3, 200, Easing.ease, false),
      setTimingAnimated(showValue, 4, 200, Easing.ease, false),
      setTimingAnimated(showValue, 5, 300, Easing.ease, false),
    ])
  );

  const scaleX = showValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [1, 1.05, 1.1, 1.15, 1, 1],
  });

  const scaleY = showValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [1, 0.95, 0.9, 0.85, 1.1, 1],
  });

  const translateY = showValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [0, 0, 0, -30, -100, 0],
  });

  const startShowWinAnimation = () => {
    animShow.current.start((data) => {
      if (data.finished) {
        setCardFinishAnim(true);
      }
    });
  };

  useEffect(() => {
    startShowWinAnimation();
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <WinContainer>
      {isCardAnimFinished && (
        <WinRewardItem
          everyDaysGiftsResult={everyDaysGiftsResult}
          isLoaded={isLoaded}
          isClosed={isClosed}
          show={show}
        />
      )}

      {!isCardAnimFinished && (
        <Card
          style={{
            transform: [
              { scaleX: scaleX },
              { scaleY: scaleY },
              { translateY: translateY },
            ],
          }}
        >
          <EveryDayCardImage source={card} resizeMode={"contain"} />
        </Card>
      )}
    </WinContainer>
  );
});

const WinContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Card = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 200px;
  height: 300px;
  margin: 10px;
`;

const EveryDayCardImage = styled.Image`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export default WinReward;
