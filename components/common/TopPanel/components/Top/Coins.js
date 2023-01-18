import React, {useEffect, useRef} from "react";
import Text from "../../../Text/Text";
import styled from "styled-components";
import AnimatedLottieView from "lottie-react-native";
import coinsAnim from "../../../../../assets/animation/lottieAnim/coin-topPanel.json";

const Coins = (props) =>{

    const lottieRef = useRef(null)

    useEffect(()=>{
        lottieRef.current.play(88, 180)
    })

    return <CoinsContainer {...props}>
        <AnimatedLottieView loop autoPlay={false}
                            ref={lottieRef}
                            source={coinsAnim}
                            style={{position: 'absolute',top: -5,left: -8,width: 50,height: 50}}/>
        <Text setShadow={true} blod medium center>{props.coins}</Text>
    </CoinsContainer>
}

const CoinsContainer = styled.View`
  position: relative;
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

const CoinsImage = styled.Image`
  position: absolute;
  top: -5px;
  left: -15px;
  width: 30px;
  height: 30px;
`

export default Coins
