import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import Text from "../../../../common/Text/Text";
import FlashItem from "./FlashItem";

const FlashTab = (props) => {
    return (
        <FlashContainer>
            <FlashScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <FlashScrollContainer>
                    <FlashItem />
                    <FlashItem />
                    <FlashItem />
                    <FlashItem />
                    <FlashItem />
                    <FlashItem />
                </FlashScrollContainer>
                <FlashCardLast />
            </FlashScroll>
        </FlashContainer>
    )
}

const FlashContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`
const FlashScroll = styled.ScrollView`
  display: flex;
`
const FlashScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`
const FlashCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default FlashTab;