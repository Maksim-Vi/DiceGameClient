import React, {useEffect} from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import { getCollectionSquareImg} from "../../../../utils/utils";
import CollectButton from "../common/CollectButton";
import {Animated, Easing} from "react-native";

const SquareItem = ({squareItem,isActive, isCollected, setModalVisible}) => {

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
        <SquareCard style={{
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
            <SquareImage source={getCollectionSquareImg(squareItem.sortIndex)}/>
            <Text center>{squareItem.name}</Text>
            <CollectButton item={squareItem}
                           setModalVisible={setModalVisible}
                           isActive={isActive}
                           isCollected={isCollected}/>
        </SquareCard>
    );
}

const SquareCard = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 40%;
  height: 180px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: rgba(220, 220, 220, 0.73);
  border: 2px solid rgba(229, 229, 229, 0.9);
`
const SquareImage = styled.Image`
  width: 70px;
  height: 70px;
`

export default SquareItem;