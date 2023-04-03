import React from 'react';
import styled from "styled-components";
import DaysCard from "./DaysCard";
import Text from "../../../../common/Text/Text";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {sevenDaysInfo} from "./utils";
import ButtonBack from "../../../../common/Buttons/Back/ButtonBack";
import {transitionState} from "../../../../utils/utils";
import {setSevenDaysGiftPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {connect, useDispatch} from "react-redux";
import {selectSevenDaysGifts} from "../../../../redux/reducers/gifts/GiftsReducer";
import NextRewardTimer from "./NextRewardTimer";
import {store} from "../../../../redux/redux-store";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";

const SevenDaysGift = (props) => {

    const dispatch = useDispatch()

    const leaveGift = () =>{
        transitionState('MainScreen')
        dispatch(setSevenDaysGiftPopup({visible: false, data: null}))
    }

    if(!props.giftData) return null

    return (
        <ModalWrapper modalBG={'bg_black'} modalVisible={true} >
            <ButtonBack top={'0px'} left={'-2px'} leaveGame={leaveGift} colorIcon={'#fefefe'}/>

            <SevenDaysContainer>
                <TitleContainer>
                    <SevenDaysTitle setShadow={true} fontSize={28} blod center>{props.dailyTitle}</SevenDaysTitle>
                </TitleContainer>

                <SevenDaysDesc setShadow={true} madium blod center>{props.dailyDesc}</SevenDaysDesc>
                <NextRewardTimer />

                <CardsContainer>
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

            </SevenDaysContainer>
        </ModalWrapper>
    )
}

const SevenDaysContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const CardsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  margin-top: 10%;
`

const TitleContainer = styled.View`
  width: 90%;
  padding: 10px;
  border-radius: 15px;
  background-color: #e63349;
  border: 2px solid #a61429;
  margin-bottom: 10px;
`
const SevenDaysTitle = styled(Text)`
 
`
const SevenDaysDesc = styled(Text)`
`

const ImageGift = styled.Image`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`

const mapStateToProps = (state) => ({
    giftData: selectSevenDaysGifts(state),
    dailyTitle: selectTranslation(state,'TR_DAILY_TITLE'),
    dailyDesc: selectTranslation(state,'TR_DAILY_DESC'),
});

export default connect(mapStateToProps)(SevenDaysGift);
