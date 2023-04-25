import React, {memo, useEffect} from 'react'
import styled from 'styled-components'
import {Animated, Dimensions, Easing} from "react-native";
import imagesGameSquares from "../../../../../assets/dynamicLoadGameSquares";
import imagesGameDices from "../../../../../assets/dynamicLoadGameDices";
import animOne from "../../../../../assets/animation/test-1.png";
import animTwo from "../../../../../assets/animation/anim-purpure-two.png";
import {setTimingAnimated} from '../../../../utils/Animation';
import Sounds, {soundsType} from "../../../../utils/Sounds";
import KickAnimation from "../../../Animation/KickAnimation";
import CollectAnimation from "../../../Animation/CollectAnimation";

const BoardItem = (props) => {

    const {width} = Dimensions.get('window');

    const showPlace = React.useRef(new Animated.Value(0))
    const spinValue = React.useRef(new Animated.Value(0))
    const animatedValue = React.useRef(new Animated.Value(1))
    const opacityValue = React.useRef(new Animated.Value(0))

    const [squaresSource, setAnimSquaresSource] = React.useState(animOne)

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
        let squareUrl = ''
        const activeSquare= imagesGameSquares[props.activeItems ? props.activeItems.square : 1000]

        if(activeSquare){
            squareUrl = activeSquare
        } else {
            squareUrl = imagesGameSquares['default']
        }

        return squareUrl ? squareUrl : ''
    }

    const getDiceNumber = () => {
        let diceImg = ''


        if(props.item > 0) {
            let diceUrl = ''
            const activeDice = imagesGameDices[props.activeItems ? props.activeItems.dice : 1]

            if(activeDice){
                diceUrl = activeDice[+props.item]
            } else {
                diceUrl = imagesGameDices['default'][+props.item]
            }

            diceImg = diceUrl
        }

        return diceImg ? diceImg : ''
    }

    const getSelectedSquares = () => {
        if (props.item > 0) {
            if (props.winPoints) {
                if (props.item === +props.winPoints.number && +props.winPoints.count === 2) {
                    return animOne
                } else if (props.item === +props.winPoints.number && +props.winPoints.count === 3) {
                    return animTwo
                }
                return ''
            }
            return ''
        }
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
        stopAnimation()
        opacityValue.current.setValue(1);

        Animated.loop(
            Animated.timing(spinValue.current, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start()
    }

    const setDiceInPlaceAnim = () => {
        Sounds.loadAndPlayFile(soundsType.drop)
        Animated.sequence([
            setTimingAnimated(animatedValue.current, 1.2, 150, Easing.ease),
            setTimingAnimated(animatedValue.current, 1, 50, Easing.ease),
        ]).start();
    }

    const stopAnimation = () => {
        opacityValue.current.setValue(0)
        spinValue.current.setValue(0)
        opacityValue.current.stopAnimation()
        spinValue.current.stopAnimation()
        setAnimSquaresSource('')
    }

    useEffect(() => {
        showPlaceAnim()

        return ()=>{
            stopAnimation()
        }
    }, [])

    useEffect(() => {
        if(props.winPoints && props.winPoints.count && props.item === +props.winPoints.number){
            getAnim()
            setAnimSquaresSource(getSelectedSquares())
        } else {
            stopAnimation()
        }
    }, [props.winPoints])

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
                {squaresSource &&
                    <SquaresAnim style={{opacity: opacityData, transform: [{rotate: rotateData}]}}
                              width={width} source={squaresSource}
                              resizeMode={'stretch'}/>
                }
                {!props.isUserBoard && <KickAnimation index={props.index} isUserBoard={false}/>}
                {props.isUserBoard && <CollectAnimation index={props.index} isUserBoard={true}/>}
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

export default memo(BoardItem)
