import React, {useEffect} from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import {getCollectionDiceImg} from "../../../../utils/utils";
import CollectButton from "../common/CollectButton";
import {Animated, Easing, useWindowDimensions} from 'react-native';

const DiceItem = ({diceItem, isActive, isCollected, setModalVisible}) => {

    const {width, height} = useWindowDimensions()
    const showPlace = React.useRef(new Animated.Value(0))

    const showPlaceAnim = () => {
        Animated.timing(showPlace.current, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        showPlaceAnim()
    }, [])

    return (
        <DiceCard width={width} height={height} style={{
            borderBottomWidth: 8,
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
            <DiceImage source={getCollectionDiceImg(diceItem.sortIndex)}/>
            <Text center>{diceItem.name}</Text>
            <CollectButton item={diceItem}
                           setModalVisible={setModalVisible}
                           isActive={isActive}
                           isCollected={isCollected}/>
        </DiceCard>
    );
}

const DiceCard = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 40%;
  height: 200px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: rgba(220, 220, 220, 0.73);
  border: 2px solid rgba(229, 229, 229, 0.9);
`
const DiceImage = styled.Image`
  width: 70px;
  height: 70px;
`

export default DiceItem;