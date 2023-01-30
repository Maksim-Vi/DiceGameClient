import React, {useEffect} from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import { getCollectionSquareImg} from "../../../../utils/utils";
import CollectButton from "../common/CollectButton";
import {Animated, Easing} from "react-native";
import lock from "../../../../../assets/common/lock.png";
import sale from "../../../../../assets/collections/label.png";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";

const SquareItem = ({squareItem,isActive,isLocked,isSale, isCollected, setModalVisible}) => {

    const showPlace = React.useRef(new Animated.Value(0))

    const showPlaceAnim = () => {
        Animated.timing(showPlace.current, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    const renderLockedBG = () =>{
        if(!isLocked) return null

        return <LockedImg source={lock} style={{transform: [{rotate: '10deg'}]}}/>
    }

    const renderSaleLabel = () =>{
        if(!isSale || isCollected) return null

        return <SaleContainer>
            <TextSale large blod center color={'#9a1515'} style={{transform: [{rotate: '-60deg'}]}}>sale</TextSale>
            <SaleImg source={sale} style={{transform: [{rotate: '-20deg'}]}}/>
        </SaleContainer>
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
            {renderLockedBG()}
            {renderSaleLabel()}

            <SquareImage source={getCollectionSquareImg(squareItem,squareItem.sortIndex)}/>
            <Text setShadow={true} numberOfLines={1} madium blod center>{squareItem.name}</Text>
            <CollectButton item={squareItem}
                           setModalVisible={setModalVisible}
                           isActive={isActive}
                           isLocked={isLocked}
                           isSale={isSale}
                           isCollected={isCollected}/>
        </SquareCard>
    );
}

const SquareCard = styled(Animated.View)`
  position: relative;
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

const LockedImg = styled.Image`
  position: absolute;
  right: 10px;
  bottom: 60px;
  width: 35px;
  height: 35px;
`

const SaleContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: -15px;
  left: -30px;
  z-index: 1;
`

const TextSale = styled(TextWithoutShadow)`
  position: absolute;
  top: 35px;
  left: 22px;
  z-index: 2;
`

const SaleImg = styled.Image`
  width: 85px;
  height: 85px;
`

const SquareImage = styled.Image`
  width: 70px;
  height: 70px;
`

export default SquareItem;