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

const FlyingAwayAnim = (props) => {

    const {
        countFlyItems = 7,
        icon,
        minRadius = 10,
        maxRadius = 10,
        iconSize = {
            width: 25,
            height: 25
        }
    } = props

    let countItemsInArr = countFlyItems || 7
    const [flyData, setFlyData] = useState({
        flyItems: []
    })

    const setAminItemsByCount = () =>{
        let data = []
        for (let i = 0; i < countItemsInArr; i++){
            data.push({
                id: i,
                rotate: `${Math.floor(Math.random() * 180)}deg`
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
                                             item={item}
                                             minRadius={minRadius}
                                             maxRadius={maxRadius}
                                             iconSize={iconSize}
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
                {
                    rotate: props.item.rotate
                }
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
            <FlyItem icon={props.icon} iconSize={props.iconSize}/>
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
  width: ${props => props.iconSize ? `${props.iconSize.width}px` : '35px'};
  height: ${props => props.iconSize ?`${props.iconSize.height}px` : '35px'};
  
`
export default FlyingAwayAnim;