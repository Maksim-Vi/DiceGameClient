import React, { useEffect } from "react";
import styled from "styled-components";
import card from "../../../../../../../assets/Gifts/EveryDatsGiftCard.png";
import { Animated, Easing } from "react-native";
import { setTimingAnimated } from "../../../../../../utils/Animation";

const EveryDayCard = (props) => {
  
  let isFinishAnimation = React.useRef(false).current;

  const showValue = React.useRef(new Animated.Value(0)).current;
  const animShow = React.useRef(
    Animated.sequence([
      Animated.delay(props.delay),
      setTimingAnimated(showValue, 0, 300, Easing.ease, false),
      setTimingAnimated(showValue, 1, 300, Easing.ease, false),
    ])
  );
  const scaleY = showValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const loadStartAnimation = () => {
    animShow.current.start(({ finished }) => {
      if (finished) {
        isFinishAnimation = true;
      }
    });
  };

  const onClickCard = () => {
    if (isFinishAnimation) {
      props.onClickCard(props.index);
    }
  };

  useEffect(() => {
    loadStartAnimation();
  }, []);

  return (
    <CardContainer style={{ transform: [{ scaleY: scaleY }] }}>
      <Card onPress={onClickCard} activeOpacity={0.9}>
        <EveryDayCardImage source={card} resizeMode={"contain"} />
      </Card>
    </CardContainer>
   
  );
};

const CardContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 200px;
  margin: 10px;
`;

const Card = styled.TouchableOpacity`
  width: 150px;
  height: 200px;
`;

const EveryDayCardImage = styled.Image`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export default EveryDayCard;
