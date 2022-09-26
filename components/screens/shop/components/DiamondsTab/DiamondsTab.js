import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import Text from "../../../../common/Text/Text";
import DiamondsItem from "./DiamondsItem";

const DiamondsTab = (props) => {
    return (
        <DiamondsContainer>
            <DiamondsScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <DiamondsScrollContainer>
                    <DiamondsItem />
                    <DiamondsItem />
                    <DiamondsItem />
                    <DiamondsItem />
                    <DiamondsItem />
                    <DiamondsItem />
                </DiamondsScrollContainer>
                <DiamondsCardLast />
            </DiamondsScroll>
        </DiamondsContainer>
    )
}

const DiamondsContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`
const DiamondsScroll = styled.ScrollView`
  display: flex;
`
const DiamondsScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`
const DiamondsCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default DiamondsTab;