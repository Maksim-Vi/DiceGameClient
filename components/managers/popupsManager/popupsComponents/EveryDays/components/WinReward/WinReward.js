import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import card from "../../../../../../../assets/Gifts/EveryDatsGiftCard.png";
import { setTimingAnimated } from "../../../../../../utils/Animation";
import { Animated, Easing } from "react-native";
import WinRewardItem from "./WinRewardItem";

const WinReward = memo(function({everyDaysGiftsResult}) {
  const [isCardAnimFinished, setCardFinishAnim] = useState(false);

  const showValue = React.useRef(new Animated.Value(0)).current;
  const animShow = React.useRef(
    Animated.sequence([
      setTimingAnimated(showValue, 0, 300, Easing.ease, true),
      setTimingAnimated(showValue, 1, 300, Easing.ease, true),
      setTimingAnimated(showValue, 2, 250, Easing.ease, true),
      setTimingAnimated(showValue, 3, 200, Easing.ease, true),
      setTimingAnimated(showValue, 4, 200, Easing.ease, true),
      setTimingAnimated(showValue, 5, 300, Easing.ease, true),
    ])
  );

  const scaleX = showValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [1, 1.05, 1.1, 1.15, 1, 1],
  });

  const scaleY = showValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [1, 0.95, 0.9, 0.85, 1.1, 1]
  });

  const translateY = showValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [0, 0, 0, -30, -100, 0]
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

  return (
    <WinContainer>
      {isCardAnimFinished && <WinRewardItem everyDaysGiftsResult={everyDaysGiftsResult}/>}

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
})

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
