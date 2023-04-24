import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {getRandomNumber} from "../../utils/utils";

const FlyingAwayAnim = ({countFlyItems = 7, icon, minRadius = 10, maxRadius = 10}) => {

    let countItemsInArr = countFlyItems || 7
    const [flyData, setFlyData] = useState({
        flyItems: []
    })

    const setAminItemsByCount = () =>{
        let data = []
        for (let i = 0; i < countItemsInArr; i++){
            data.push({
                id: i
            })
        }

        return data
    }

    const onStartAnim = () =>{
        setFlyData({
            ...flyData,
            flyItems: setAminItemsByCount()
        })
    }

    const reset = () =>{
        setFlyData({
            ...flyData,
            flyItems: []
        })
    }

    useEffect(()=>{
        onStartAnim()
        return ()=>{
            reset()
        }
    },[])

    return (
        <AnimContainer>
            {
                flyData.flyItems.map(item=>{
                    return <FlyItemContainer key={item.id}
                                             minRadius={minRadius}
                                             maxRadius={maxRadius}
                                             icon={icon} />
                })
            }
        </AnimContainer>
    )
};

const FlyItemContainer = (props) =>{

    const opacity = useSharedValue(1);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                {
                    translateX: withSpring(offsetX.value),
                },
                {
                    translateY: withSpring(offsetY.value)
                },
            ],
        };
    },[]);

    useEffect(()=>{
        opacity.value = withDelay(500, withTiming(0))
        offsetX.value = getRandomNumber(props.minRadius, props.maxRadius, true)
        offsetY.value = getRandomNumber(props.minRadius, props.maxRadius, true)
    },[])

    return (
        <ItemsContainer {...props} style={animatedStyles}>
            <FlyItem icon={props.icon}/>
        </ItemsContainer>
    );
}

const FlyItem = (props) =>{
    return <Item {...props} source={props.icon} resizeMode={'stretch'} />
}

const AnimContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`
const ItemsContainer = styled(Animated.View)`
  position: absolute;
  background: transparent;
  
`
const Item = styled.Image`
  width: 35px;
  height: 35px;
  
`
export default FlyingAwayAnim;