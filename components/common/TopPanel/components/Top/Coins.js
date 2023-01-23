import React, {useEffect, useRef} from "react";
import Text from "../../../Text/Text";
import styled from "styled-components";
import AnimatedLottieView from "lottie-react-native";
import coinsAnim from "../../../../../assets/animation/lottieAnim/coin-topPanel.json";
import {Platform} from "react-native";

const Coins = (props) =>{

    const lottieRef = useRef(null)

    useEffect(()=>{
        lottieRef.current.play(88, 180)
    })

    return <CoinsContainer {...props}>
        <AnimatedLottieView loop autoPlay={false}
                            ref={lottieRef}
                            source={coinsAnim}
                            style={{position: 'absolute', left: Platform.OS === 'ios' ? -8 : -12, width: 50}}/>
        <Text setShadow={true} blod medium center>{props.coins}</Text>
    </CoinsContainer>
}

const CoinsContainer = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgb(255,157,77);
  border-radius: 5px;
  background-color: aqua;
  padding: 2px 20px 2px 20px;
  
  ${(props)=>{
      if(props.width){
          return `width: ${props.width}px;`
      }
  }}
  
`
export default Coins
