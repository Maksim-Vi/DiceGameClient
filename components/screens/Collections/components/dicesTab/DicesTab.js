import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import DiceItem from "./DiceItem";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import ModalChildrenBuy from "../../../../common/ModalWindows/ModalChildren/ModalChildrenBuy";
import {useDispatch, useSelector} from "react-redux";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import SquareItem from "../squaresTab/SquareItem";
import {setCollectBuyItemPopup} from "../../../../redux/reducers/popups/PopupsReducer";

const DicesTab = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state=> selectMyUser(state))

    const setModalVisible = (isVisible, item) =>{
        dispatch(setCollectBuyItemPopup({visible: true, data: {
                modalName: 'Dices',
                openItem: item
            }}))
    }

    return (
        <DicesContainer>
            <DicesScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <DiceScrollContainer>
                    {props.dices &&
                        [...props.dices]
                            .sort((a,b)=> a.sortIndex > b.sortIndex ? 1 : -1)
                            .reduce((acc, diceItem, index)=>{
                                const isCollected = props.availableItems.dices.includes(+diceItem.id)
                                const isActive = +props.activeItems.dice === +diceItem.id
                                const isLocked = diceItem.lvlUnlock > user.experience.lvl
                                const isSale = diceItem.isSale === 'true'

                                if(
                                    (diceItem.available && diceItem.available === 'true') ||
                                    (diceItem.available && diceItem.available !== 'true' && user.admin === 'true')
                                ){
                                    acc.push(<DiceItem key={diceItem.id}
                                                       isActive={isActive}
                                                       isCollected={isCollected}
                                                       isLocked={isLocked}
                                                       isSale={isSale}
                                                       diceItem={diceItem}
                                                       setModalVisible={setModalVisible}/>
                                    )
                                }

                                return acc;
                            },[])
                    }
                </DiceScrollContainer>
                <DiceCardLast />
            </DicesScroll>
        </DicesContainer>
    );
}

const DicesContainer = styled.View`
    flex: .83;
    display: flex;
    width: 100%;
`
const DicesScroll = styled.ScrollView`
  display: flex;
`
const DiceScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`

const DiceCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`
const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default DicesTab;