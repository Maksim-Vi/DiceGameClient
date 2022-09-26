import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import CoinItem from "./CoinItem";

const CoinsTab = (props) => {
    return (
        <CoinsContainer>
            <CoinsScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <CoinsScrollContainer>
                    <CoinItem />
                    <CoinItem />
                    <CoinItem />
                    <CoinItem />
                    <CoinItem />
                    <CoinItem />
                </CoinsScrollContainer>
                <CoinsCardLast />
            </CoinsScroll>
        </CoinsContainer>
    )
}

const CoinsContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`
const CoinsScroll = styled.ScrollView`
  display: flex;
`
const CoinsScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`
const CoinsCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default CoinsTab;