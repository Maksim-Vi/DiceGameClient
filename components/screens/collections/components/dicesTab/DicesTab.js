import React from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {StyleSheet} from "react-native";
import DiceItem from "./DiceItem";

const DicesTab = (props) => {
    return (
        <DicesContainer>
            <DicesScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <DiceScrollContainer>
                    {props.dices &&
                        [...props.dices].sort((a,b)=> a.sortIndex > b.sortIndex ? 1 : -1).map(diceItem=>{
                            return <DiceItem key={diceItem.id} diceItem={diceItem}/>
                        })
                    }
                </DiceScrollContainer>
                <DiceCardLast />
            </DicesScroll>
        </DicesContainer>
    );
}

const DicesContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`
const DicesScroll = styled.ScrollView`
  display: flex;
`
const DiceScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`

const DiceCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`
const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default DicesTab;