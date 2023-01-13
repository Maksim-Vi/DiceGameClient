import React from 'react';
import styled from "styled-components";
import DaysCard from "./DaysCard";
import Text from "../../../../common/Text/Text";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {sevenDaysInfo} from "./utils";

const SevenDaysGift = (props) => {
    return (
        <ModalWrapper modalBG={'bg_black'} modalVisible={true}>
            <SevenDaysContainer>
                <SevenDaysTitle setShadow={true} title blod center>Daily Gifts</SevenDaysTitle>

                <CardsContainer>
                    {
                        sevenDaysInfo.map(item => {
                            return <DaysCard key={item.id} title={item.title}>
                                <ImageGift source={item.icon}/>
                                <Text setShadow={true} madium blod center>123</Text>
                            </DaysCard>
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

export default SevenDaysGift;