import React, {memo, useEffect, useState} from 'react';
import imagesGameSquares from "../../../../../assets/dynamicLoadGameSquares";
import {Dimensions} from "react-native";
import styled from "styled-components";

const Square = memo(function Square(props) {

    const {width} = Dimensions.get('window');
    const [squareScore, setSquareNumber] = useState(null)

    const getSquare = () => {
        let squareUrl = ''
        const activeSquare= imagesGameSquares[props.activeItems ? props.activeItems.square : 1000]

        if(activeSquare){
            squareUrl = activeSquare
        } else {
            squareUrl = imagesGameSquares['default']
        }

        return squareUrl ? squareUrl : ''
    }

    useEffect(() => {
        if(!squareScore){
            setSquareNumber(getSquare())
        }
    }, [])

    return <SquaresImage width={width}
                         source={squareScore}
                         resizeMode={'stretch'}/>
})

const SquaresImage = styled.Image`
  ${(props) => {
    if (props.width > 420) {
      return `
        width: 65px;
        height: 65px
      `;
    } else if (props.width > 380 && props.width < 420) {
      return `
        width: 55px;
        height: 55px
      `;
    } else if (props.width < 380) {
      return `
        width: 45px;
        height: 45px
      `;
    }
  }};
  align-items: center;
  justify-content: center;
`

export default Square;