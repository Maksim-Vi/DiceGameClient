import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import DiceItem from "./DiceItem";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import ModalChildrenBuy from "../../../../common/ModalWindows/ModalChildren/ModalChildrenBuy";

const DicesTab = (props) => {
    const [modal, setModal] = React.useState({
        visible: false,
        modalName: 'Dices',
        openItem: {}
    });

    const setModalVisible = (isVisible, item) =>{
        setModal({
            ...modal,
            visible: isVisible,
            openItem: item
        })
    }

    const Model = () =>{
        return (
            <ModalWrapper modalVisible={modal.visible} setModalVisible={setModalVisible}>
                <ModalChildrenBuy titleItemName={modal.modalName} openItem={modal.openItem} setModalVisible={setModalVisible}/>
            </ModalWrapper>
        )
    }

    return (
        <DicesContainer>
            <DicesScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <DiceScrollContainer>
                    {props.dices &&
                        [...props.dices].sort((a,b)=> a.sortIndex > b.sortIndex ? 1 : -1).map(diceItem=>{
                            const isCollected = props.availableItems.dices.includes(+diceItem.id)
                            const isActive = +props.activeItems.dice === +diceItem.id

                            return <DiceItem key={diceItem.id}
                                             isActive={isActive}
                                             isCollected={isCollected}
                                             diceItem={diceItem}
                                             setModalVisible={setModalVisible}/>
                        })
                    }
                </DiceScrollContainer>
                <DiceCardLast />
            </DicesScroll>
            {Model()}
        </DicesContainer>
    );
}

const DicesContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
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