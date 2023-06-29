import React, {memo} from 'react';
import styled from 'styled-components'
import {Animated, Dimensions, Easing} from "react-native";
import animOne from "../../../assets/animation/test-1.png";
import animTwo from "../../../assets/animation/anim-purpure-two.png";

const SquaresRotateAnim = memo(function SquaresRotateAnim(props) {
   
    const {width} = Dimensions.get('window');

    const spinValue = React.useRef(new Animated.Value(0))
    const opacityValue = React.useRef(new Animated.Value(0))

    const [squaresSource, setAnimSquaresSource] = React.useState(animOne)
    const [prevWiningNumber, setPrevWiningsNumber] = React.useState(null)
    const [isPlayAnim, setIsPlayAnim] = React.useState(false)

    const rotateData = spinValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const opacityData = opacityValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    })

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

    const stopAnimation = () => {
        opacityValue.current.setValue(0)
        spinValue.current.setValue(0)
        setAnimSquaresSource('')
    }

    React.useEffect(() => {
        if(props.winPoints && props.winPoints.count && props.item === +props.winPoints.number){
            if(!isPlayAnim){
                getAnim()
                setAnimSquaresSource(getSelectedSquares())
                setIsPlayAnim(true)
            } else if(isPlayAnim && prevWiningNumber && props.winPoints.count !== prevWiningNumber.count){
                getAnim()
                setAnimSquaresSource(getSelectedSquares())
            }
 
             setPrevWiningsNumber(props.winPoints)
         } else {
             setPrevWiningsNumber(null)
             stopAnimation()
             setIsPlayAnim(false)
         }
     }, [props.winPoints])

    return (
        <React.Fragment>
            {squaresSource && prevWiningNumber &&
                    <SquaresAnim style={{opacity: opacityData, transform: [{rotate: rotateData}]}}
                              width={width} source={squaresSource}
                              resizeMode={'stretch'}/>
                }
        </React.Fragment>

    )
})

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

export default SquaresRotateAnim;