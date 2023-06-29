import React, {memo, useEffect} from 'react'
import styled from 'styled-components'
import {Animated, Dimensions, Easing} from "react-native";
import KickAnimation from "../../../Animation/KickAnimation";
import CollectAnimation from "../../../Animation/CollectAnimation";
import SquaresRotateAnim from "../../../Animation/SquaresRotateAnim";
import Dice from "./Dice";
import Square from "./Square";

const BoardItem = memo(function BoardItem( props) {
    const showPlace = React.useRef(new Animated.Value(0))
   
    const handlerClick = () => {
        if (props.selectBoardItem && props.item === 0) {
            props.selectBoardItem(props.index)
        }
    }

    const showPlaceAnim = () => {
        Animated.timing(showPlace.current, {
            toValue: 1,
            duration: props.delay + 100,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        showPlaceAnim()
    }, [])

    return (
        <AnimConatiner style={{
            opacity: showPlace.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [
                {
                    scale: showPlace.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            ]
        }}>
            <ItemContainer {...props}
                           onPress={handlerClick}
                           enabled={true}
                           activeOpacity={.8}>

                <Square activeItems={props.activeItems}/>
                <Dice activeItems={props.activeItems} item={props.item}/>

                <SquaresRotateAnim item={props.item} winPoints={props.winPoints}/>
               
                {!props.isUserBoard && <KickAnimation index={props.index} isUserBoard={false}/>}
                {props.isUserBoard && <CollectAnimation index={props.index} isUserBoard={true}/>}
            </ItemContainer>
        </AnimConatiner>

    )
})

const AnimConatiner = styled(Animated.View)`
  position: relative;
  width: 33%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`
const ItemContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default memo(BoardItem)
