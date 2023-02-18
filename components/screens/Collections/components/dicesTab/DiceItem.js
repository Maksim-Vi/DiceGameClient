import React, {useEffect} from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import lock from '../../../../../assets/common/lock.png'
import {getCollectionDiceImg} from "../../../../utils/utils";
import CollectButton from "../common/CollectButton";
import {Animated, Easing, useWindowDimensions} from 'react-native';
import sale from "../../../../../assets/collections/sale.png";
import collBg from "../../../../../assets/common/glass_frame.png";

const DiceItem = ({diceItem, isActive, isLocked, isSale, isCollected, setModalVisible}) => {

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

    const renderLockedBG = () => {
        if (!isLocked) return null

        return <LockedImg source={lock} style={{transform: [{rotate: '10deg'}]}}/>
    }

    const renderSaleLabel = () => {
        if (!isSale) return null

        return <SaleContainer>
            {/*<TextSale large blod center color={'#9a1515'} style={{transform: [{rotate: '-60deg'}]}}>sale</TextSale>*/}
            <SaleImg source={sale}/>
        </SaleContainer>
    }

    useEffect(() => {
        showPlaceAnim()
    }, [])

    /* return (
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
             ],
         }}>
             {renderLockedBG()}
             {renderSaleLabel()}

             <DiceImage source={getCollectionDiceImg(diceItem, diceItem.sortIndex)}/>
             <Text center>{diceItem.name}</Text>
             <CollectButton item={diceItem}
                            setModalVisible={setModalVisible}
                            isActive={isActive}
                            isSale={isSale}
                            isLocked={isLocked}
                            isCollected={isCollected}/>
         </DiceCard>
     );*/

    return (
        <DiceCard style={{
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
            ],
        }}>
            <CollectionCardBG source={collBg} resizeMode="contain">
                {renderLockedBG()}
                {renderSaleLabel()}

                <DiceImage source={getCollectionDiceImg(diceItem, diceItem.sortIndex)}/>
                <Text setShadow={true} numberOfLines={1} madium blod center>{diceItem.name}</Text>
                <CollectButton item={diceItem}
                               setModalVisible={setModalVisible}
                               isActive={isActive}
                               isSale={isSale}
                               isLocked={isLocked}
                               isCollected={isCollected}/>
            </CollectionCardBG>
        </DiceCard>
    )
}
const DiceCard = styled(Animated.View)``

const CollectionCardBG = styled.ImageBackground`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 180px;
  height: 180px;
  margin: 10px auto;
  padding: 10px 20px;
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
  top: -20px;
  right: -5px;
  z-index: 1;
`
const SaleImg = styled.Image`
  width: 100px;
  height: 100px;
`

const DiceImage = styled.Image`
  width: 70px;
  height: 70px;
`

export default DiceItem;