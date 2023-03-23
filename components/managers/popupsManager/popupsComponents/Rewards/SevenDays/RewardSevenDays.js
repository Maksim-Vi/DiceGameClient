import React from 'react';
import {sevenDaysInfo} from "../../SevenDays/utils";
import {selectTranslation} from "../../../../../redux/reducers/language/LanguageReducer";
import {store} from "../../../../../redux/redux-store";
import DaysCard from "../../SevenDays/DaysCard";
import Text from "../../../../../common/Text/Text";
import styled from "styled-components";
import {selectSevenDaysGifts} from "../../../../../redux/reducers/gifts/GiftsReducer";
import {connect} from "react-redux";
import SlideScreen from "../../../../../common/AnimationScreens/SlideScreen";
import NextRewardTimer from "../../SevenDays/NextRewardTimer";
import {useWindowDimensions} from "react-native";

const RewardSevenDays = props => {

    const {width,height} = useWindowDimensions()

    return (
        <SlideScreen left={false}>
            <SevenDaysDesc setShadow={true} madium blod center>{props.dailyDesc}</SevenDaysDesc>
            <NextRewardTimer />

            <CardsContainer height={height}>
                {
                    props.giftData.map((item,index) => {
                        const giftLocalData = sevenDaysInfo[index]
                        const getTitle = selectTranslation(store.getState(), giftLocalData.title)
                        return (
                            <DaysCard key={item.id} title={getTitle} giftItem={item} typeReward={giftLocalData.typeReward}>
                                <ImageGift source={giftLocalData.icon}/>
                                <Text setShadow={true} large blod center>{item.rewardQuantity}</Text>
                            </DaysCard>
                        )
                    })
                }
            </CardsContainer>
        </SlideScreen>
    );
};

const CardsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  margin-top:${(props)=> props.height < 700 ? `0px` : '10%'};
`

const ImageGift = styled.Image`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`
const SevenDaysDesc = styled(Text)`
`

const mapStateToProps = (state) => ({
    giftData: selectSevenDaysGifts(state),
    dailyDesc: selectTranslation(state,'TR_DAILY_DESC'),
});

export default connect(mapStateToProps)(RewardSevenDays);