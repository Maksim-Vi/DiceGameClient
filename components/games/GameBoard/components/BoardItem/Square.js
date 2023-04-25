import React from 'react';

const Square = () => {
    return (
        <>

        </>
    );
};

export default Square;


// import React, {useEffect} from 'react';
// import imagesGameSquares from "../../../../../assets/dynamicLoadGameSquares";
// import animOne from "../../../../../assets/animation/test-1.png";
// import {Animated, Dimensions, Easing} from "react-native";
// import styled from "styled-components";
// import animTwo from "../../../../../assets/animation/anim-purpure-two.png";
//
// const Square = (props) => {
//
//     const {width} = Dimensions.get('window');
//     const spinValue = React.useRef(new Animated.Value(0))
//     const opacityValue = React.useRef(new Animated.Value(0))
//     const [squaresSource, setAnimSquaresSource] = React.useState(animOne)
//
//     const rotateData = spinValue.current.interpolate({
//         inputRange: [0, 1],
//         outputRange: ['0deg', '360deg'],
//     });
//
//     const opacityData = opacityValue.current.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 1],
//     })
//
//
//     const getSquare = () => {
//         let squareUrl = ''
//         const activeSquare= imagesGameSquares[props.activeItems ? props.activeItems.square : 1000]
//
//         if(activeSquare){
//             squareUrl = activeSquare
//         } else {
//             squareUrl = imagesGameSquares['default']
//         }
//
//         return squareUrl ? squareUrl : ''
//     }
//
//     const getSelectedSquares = () => {
//         if (props.item > 0) {
//             if (props.winPoints) {
//                 if (props.item === +props.winPoints.number && +props.winPoints.count === 2) {
//                     return animOne
//                 } else if (props.item === +props.winPoints.number && +props.winPoints.count === 3) {
//                     return animTwo
//                 }
//                 return ''
//             }
//             return ''
//         }
//         return ''
//     }
//
//     const getAnim = () => {
//         stopAnimation()
//         opacityValue.current.setValue(1);
//
//         Animated.loop(
//             Animated.timing(spinValue.current, {
//                 toValue: 1,
//                 duration: 10000,
//                 easing: Easing.linear,
//                 useNativeDriver: true,
//             })
//         ).start()
//     }
//
//     const stopAnimation = () => {
//         opacityValue.current.setValue(0)
//         spinValue.current.setValue(0)
//         opacityValue.current.stopAnimation()
//         spinValue.current.stopAnimation()
//         setAnimSquaresSource('')
//     }
//
//     useEffect(() => {
//         if(props.winPoints && props.winPoints.count && props.item === +props.winPoints.number){
//             getAnim()
//             setAnimSquaresSource(getSelectedSquares())
//         } else {
//             stopAnimation()
//         }
//     }, [props.winPoints])
//
//     return (
//         <>
//             {getSquare() !== '' &&
//                 <SquaresImage width={width}
//                               source={getSquare()}
//                               resizeMode={'stretch'}/>
//             }
//             {squaresSource &&
//                 <SquaresAnim style={{opacity: opacityData, transform: [{rotate: rotateData}]}}
//                              width={width} source={squaresSource}
//                              resizeMode={'stretch'}/>
//             }
//         </>
//     );
// };
//
// const SquaresImage = styled.Image`
//   ${(props)=> {
//     if(props.width > 420){
//         return `
//         width: 65px;
//         height: 65px
//       `;
//     } else if(props.width > 380 && props.width < 420){
//         return `
//         width: 55px;
//         height: 55px
//       `;
//     } else if(props.width < 380){
//         return `
//         width: 45px;
//         height: 45px
//       `;
//     }
// }};
//   align-items: center;
//   justify-content: center;
// `
//
// const SquaresAnim = styled(Animated.Image)`
//   position: absolute;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   ${(props)=> {
//     if(props.width > 420){
//         return `
//         width: ${65 * 1.5}px;
//         height: ${65 * 1.5}px;
//       `;
//     } else if(props.width > 380 && props.width < 420){
//         return `
//         width: ${55 * 1.5}px;
//         height: ${55 * 1.5}px;
//       `;
//     } else if(props.width < 380){
//         return `
//         width: ${45 * 1.5}px;
//         height: ${45 * 1.5}px;
//       `;
//     }
// }};
//   margin: auto;
// `
//
// export default Square;