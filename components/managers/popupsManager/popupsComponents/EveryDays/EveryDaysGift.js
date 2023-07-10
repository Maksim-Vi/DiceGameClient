import React, { memo, useState } from "react";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import { connect } from "react-redux";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import EveryDayCard from "./components/Card/EveryDayCard";
import {
  selectEveryDaysGifts,
  selectSevenDaysGiftsResult,
} from "../../../../redux/reducers/gifts/GiftsReducer";
import C_CLAIM_EVERY_DAY_GIFT from "../../../../protocol/messages/clients/gifts/C_CLAIM_EVERY_DAY_GIFT";
import WinReward from "./components/WinReward/WinReward";
import {
  selectDefaultParams,
  selectTranslation,
} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import defaultParams from "../../../../redux/reducers/language/defaultParams";
import { selectMyUser } from "../../../../redux/reducers/players/PlayersReducer";

const EveryDaysGift = memo((props) => {

  const [selectedCard, setSelectedCard] = useState(null);

  const onClickCard = (index) => {
    setSelectedCard(index);
    new C_CLAIM_EVERY_DAY_GIFT();
  };

  return (
    <ModalWrapper modalBG={"bg_black"} modalVisible={true}>
      <EveryDaysContainer>
        {!selectedCard && (
          <TitleContainer>
            <EveryDaysTitle setShadow={true} fontSize={28} blod center>
              {props.everyDayTitle}
            </EveryDaysTitle>
          </TitleContainer>
        )}

        {!selectedCard && (
          <CardsContainer selectedCard={selectedCard}>
            {props.evertDaysGift.length > 0 &&
              props.evertDaysGift.map((item, index) => {
                if (item) {
                  return (
                    <EveryDayCard
                      key={index}
                      index={index + 1}
                      delay={150 * index}
                      onClickCard={onClickCard}
                    />
                  );
                }
              })}
          </CardsContainer>
        )}

        {selectedCard && props.everyDaysGiftsResult && (
          <WinReward
            everyDaysGiftsResult={props.everyDaysGiftsResult}
            ENABLE_AD_PROD={props.ENABLE_AD_PROD}
            ENABLE_AD_IOS_PROD={props.ENABLE_AD_IOS_PROD}
            ENABLE_AD_ANDROID_PROD={props.ENABLE_AD_ANDROID_PROD}
            user={props.user}
          />
        )}
      </EveryDaysContainer>
    </ModalWrapper>
  );
})

const EveryDaysContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CardsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: ${(props) => (props.selectedCard ? "nowrap" : "wrap")};
  height: ${(props) => (props.selectedCard ? "100%" : "50%")};
`;

const TitleContainer = styled.View`
  width: 80%;
  margin-bottom: 50px;
`;
const EveryDaysTitle = styled(Text)``;

const mapStateToProps = (state) => ({
  user: selectMyUser(state),
  evertDaysGift: selectEveryDaysGifts(state),
  everyDaysGiftsResult: selectSevenDaysGiftsResult(state),
  everyDayTitle: selectTranslation(state, defaultTranslation.TR_TITLE_EVERY_DAY_GIFT),
  ENABLE_AD_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_PROD),
  ENABLE_AD_ANDROID_PROD: selectDefaultParams(state, defaultParams.ENABLE_AD_ANDROID_PROD),
  ENABLE_AD_IOS_PROD: selectDefaultParams( state, defaultParams.ENABLE_AD_IOS_PROD),
});

export default connect(mapStateToProps)(EveryDaysGift);
