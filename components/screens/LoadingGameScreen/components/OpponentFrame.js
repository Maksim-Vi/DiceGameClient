import React, {useState} from 'react';
import styled from "styled-components";
import {Animated, Easing} from "react-native";
import {setTimingAnimated} from "../../../utils/Animation";
import dice1 from '../../../../assets/collections/dices/d_4/dice_1.png'
import dice2 from '../../../../assets/collections/dices/d_4/dice_2.png'
import dice3 from '../../../../assets/collections/dices/d_4/dice_3.png'
import dice4 from '../../../../assets/collections/dices/d_4/dice_4.png'
import dice5 from '../../../../assets/collections/dices/d_4/dice_5.png'
import dice6 from '../../../../assets/collections/dices/d_4/dice_6.png'

const OpponentFrame = () => {

    let animTimer = null
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const [animData, setAnimData] = useState({
        arrDices: [dice1,dice2,dice3,dice4,dice5,dice6],
        src: dice1
    })

    const animateStart = () => {
        Animated.sequence([
            Animated.delay(100),
            setTimingAnimated(animatedValue, 1.1, 500, Easing.ease),
            setTimingAnimated(animatedValue, 1, 400, Easing.ease),
        ]).start(()=>{
            loadOpponent()
        });
    }

    const loadOpponent = () =>{
        let index = 0
        animTimer = setInterval(() => {
            if(animData.arrDices[index]){
                setAnimData({...animData, src: animData.arrDices[index]})
            }
            index++

            if(index > animData.arrDices.length) {
                index = 0
                Animated.sequence([
                    setTimingAnimated(animatedValue, 1.1, 100, Easing.ease),
                    setTimingAnimated(animatedValue, 1, 100, Easing.ease),
                ]).start()
            }
        }, 300);
    }

    React.useEffect(()=>{
        animateStart()
        return ()=>{
            clearInterval(animTimer)
        }
    },[])

    return (
        <OpponentContainer style={{
            opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [
                {
                    scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            ]
        }}>
            <DiceImg source={animData.src ? animData.src : ''} resizeMode={ 'stretch'} />
        </OpponentContainer>
    );
};

const OpponentContainer = styled(Animated.View)`
    display: flex;
    align-items: center;
    justify-content: center;
`

const DiceImg = styled.Image`
  width: 80px;
  height: 80px;
`
export default OpponentFrame;