import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import { setEveryDaysGiftPopup } from "../../../../redux/reducers/popups/PopupsReducer";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import { transitionState } from "../../../../utils/utils";
import EveryDayCard from "./components/Card/EveryDayCard";
import { selectEveryDaysGifts, selectSevenDaysGiftsResult } from "../../../../redux/reducers/gifts/GiftsReducer";
import C_CLAIM_EVERY_DAY_GIFT from "../../../../protocol/messages/clients/gifts/C_CLAIM_EVERY_DAY_GIFT";
import WinReward from "./components/WinReward/WinReward";
import { selectTranslation } from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const EveryDaysGift = () => {


  const dispatch = useDispatch();
  const evertDaysGift = useSelector(selectEveryDaysGifts);
  const everyDaysGiftsResult = useSelector(selectSevenDaysGiftsResult);
  const everyDayTitle = useSelector(state => selectTranslation(state, defaultTranslation.TR_TITLE_EVERY_DAY_GIFT));

  const [selectedCard, setSelectedCard] = useState(null);

  const leaveGift = () => {
    transitionState("MainScreen");
    dispatch(setEveryDaysGiftPopup({ visible: false, data: null }));
  };

  const onClickCard = (index) => {
    setSelectedCard(index);
    new C_CLAIM_EVERY_DAY_GIFT()
  };

  return (
    <ModalWrapper modalBG={"bg_black"} modalVisible={true}>
      <EveryDaysContainer>
        {!selectedCard && (
          <TitleContainer>
            <EveryDaysTitle setShadow={true} fontSize={28} blod center>
               {everyDayTitle}
            </EveryDaysTitle>
          </TitleContainer>
        )}

        {!selectedCard && (
          <CardsContainer selectedCard={selectedCard}>
            {evertDaysGift.length > 0 &&
              evertDaysGift.map((item, index) => {
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

        {selectedCard && everyDaysGiftsResult && <WinReward everyDaysGiftsResult={everyDaysGiftsResult}/>}
      </EveryDaysContainer>
    </ModalWrapper>
  );
};

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

export default EveryDaysGift;
