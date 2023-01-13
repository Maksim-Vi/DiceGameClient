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

const SevenDaysGift = (props) => {

    const dispatch = useDispatch()

    const leaveGift = () =>{
        transitionState('MainScreen')
        dispatch(setSevenDaysGiftPopup({visible: false, data: null}))
    }

    if(!props.giftData) return null

    return (
        <ModalWrapper modalBG={'bg_black'} modalVisible={true} >
            <ButtonBack leaveGame={leaveGift} colorIcon={'#fefefe'}/>
            <SevenDaysContainer>
                <SevenDaysTitle setShadow={true} title blod center>Daily Gifts</SevenDaysTitle>

                <CardsContainer>
                    {
                        props.giftData.map((item,index) => {
                            const giftLocalData = sevenDaysInfo[index]
                            return (
                                <DaysCard key={item.id} title={giftLocalData.title} giftItem={item}>
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
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  height: auto;
`

const SevenDaysTitle = styled(Text)`
`

const ImageGift = styled.Image`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`

const mapStateToProps = (state) => ({
    giftData: selectSevenDaysGifts(state)
});

export default connect(mapStateToProps)(SevenDaysGift);
