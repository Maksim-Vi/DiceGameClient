import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Animated, Dimensions, Easing, Image} from "react-native";
import imagesGameSquares from "../../../../../assets/dynamicLoadGameSquares";
import imagesGameDices from "../../../../../assets/dynamicLoadGameDices";
import animOne from "../../../../../assets/animation/anim-light-one.png";
import animTwo from "../../../../../assets/animation/anim-purpure-two.png";
import {setTimingAnimated} from '../../../../utils/Animation';

const BoardItem = (props) => {

    const {width} = Dimensions.get('window');

    const showPlace = React.useRef(new Animated.Value(0))
    const spinValue = React.useRef(new Animated.Value(0))
    const animatedValue = React.useRef(new Animated.Value(1))
    const opacityValue = React.useRef(new Animated.Value(0))

    const [showAnim, setShowAnim] = React.useState(false)

    const rotateData = spinValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const opacityData = opacityValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    })

    const scaleData = animatedValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const hendlerClick = () => {
        if (props.selectBoardItem && props.item === 0) {
            setDiceInPlaceAnim()
            props.selectBoardItem(props.index)
        }
    }

    const getSquare = () => {
        const square = imagesGameSquares[props.activeItems ? props.activeItems.square : 13]

        return square ? square : ''
    }

    const getDiceNumber = () => {
        let diceImg = ''

        if (props.item > 0) {
            diceImg = imagesGameDices[props.activeItems ? props.activeItems.dice : 14][+props.item]
        }

        return diceImg ? diceImg : ''
    }

    const getSelectedSquares = () => {
        if (props.item > 0) {
            if (props.winPoints) {
                if (props.item === +props.winPoints.number && +props.winPoints.count === 2) {
                    getAnim()
                    return animOne
                } else if (props.item === +props.winPoints.number && +props.winPoints.count === 3) {
                    getAnim()
                    return animTwo
                }

                stopAnimation()
                return ''
            }
            return ''
        }

        stopAnimation()
        return ''
    }

    const showPlaceAnim = () => {
        Animated.timing(showPlace.current, {
            toValue: 1,
            duration: props.delay + 100,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    const getAnim = () => {
        if (!showAnim) {
            spinValue.current.setValue(0);
            opacityValue.current.setValue(1);

            Animated.timing(spinValue.current, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => getAnim());

            setShowAnim(true)
        }
    }

    const setDiceInPlaceAnim = () => {
        Animated.sequence([
            setTimingAnimated(animatedValue.current, 1.2, 150, Easing.ease),
            setTimingAnimated(animatedValue.current, 1, 50, Easing.ease),
        ]).start();
    }


    const stopAnimation = () => {
        if (showAnim) {
            opacityValue.current.setValue(0)
            setShowAnim(false)
        }
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
                           onPress={hendlerClick}
                           enabled={true}
                           activeOpacity={.8}>
                {getSquare() !== '' &&
                    <SquaresImage width={width}
                               source={getSquare()}
                               resizeMode={'stretch'}/>
                }
                {getDiceNumber() !== "" &&
                    <DiceImage width={width}
                               style={{transform: [{scale: scaleData}]}}
                               source={getDiceNumber()}
                               resizeMode={'stretch'}/>
                }
                {getSelectedSquares() !== '' &&
                    <SquaresAnim style={{opacity: opacityData, transform: [{rotate: rotateData}]}}
                              width={width} source={getSelectedSquares()}
                              resizeMode={'stretch'}/>
                }
            </ItemContainer>
        </AnimConatiner>

    )
}

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

const SquaresImage = styled.Image`
  ${(props)=> {
    if(props.width > 420){
      return `
        width: 65px;
        height: 65px
      `;
    } else if(props.width > 380 && props.width < 420){
      return `
        width: 55px;
        height: 55px
      `;
    } else if(props.width < 380){
      return `
        width: 45px;
        height: 45px
      `;
    }
  }};
  align-items: center;
  justify-content: center;
`

const SquaresAnim = styled(Animated.Image)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props)=> {
    if(props.width > 420){
      return `
        width: ${65 * 1.5}px;
        height: ${65 * 1.5}px;
      `;
    } else if(props.width > 380 && props.width < 420){
      return `
        width: ${55 * 1.5}px;
        height: ${55 * 1.5}px;
      `;
    } else if(props.width < 380){
      return `
        width: ${45 * 1.5}px;
        height: ${45 * 1.5}px;
      `;
    }
  }};
  margin: auto;
`

const DiceImage = styled(Animated.Image)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  ${(props)=> {
    if(props.width > 420){
      return `
        width: ${65 / 1.5}px
        height: ${65 / 1.5}px
      `;
    }  else if(props.width > 380 && props.width < 420){
      return `
        width: ${55 / 1.5}px;
        height: ${55 / 1.5}px;
      `;
    } else if(props.width < 380){
      return `
        width: ${45 / 1.5}px;
        height: ${45 / 1.5}px;
      `;
    }
  }};
  z-index: 1;
`

export default BoardItem
