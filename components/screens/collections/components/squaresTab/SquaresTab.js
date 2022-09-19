import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import SquareItem from "./SquareItem";

const SquaresTab = (props) => {
    return (
        <Square>
            <SquaresScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <SquaresScrollContainer>
                    {props.squares &&
                        props.squares.map(squareItem=>{
                            return <SquareItem key={squareItem.id} squareItem={squareItem}/>
                        })
                    }
                </SquaresScrollContainer>
                <SquareCardLast />
            </SquaresScroll>
        </Square>
    );
}

const Square = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`

const SquaresScroll = styled.ScrollView`
  display: flex;
`

const SquaresScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`

const SquareCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default SquaresTab;