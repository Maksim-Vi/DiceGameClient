import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import SquareItem from "./SquareItem";
import ModalWrapper from "../../../../common/ModalWondows/ModalWrapper";
import ModalChildrenBuy from "../../../../common/ModalWondows/ModalChildren/ModalChildrenBuy";

const SquaresTab = (props) => {

    const [modal, setModal] = React.useState({
        visible: false,
        modalName: 'Squares',
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
        <Square>
            <SquaresScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <SquaresScrollContainer>
                    {props.squares &&
                        [...props.squares].sort((a,b)=> a.sortIndex > b.sortIndex ? 1 : -1).map(squareItem=>{
                            const isCollected = props.availableItems.squares.includes(+squareItem.id)
                            const isActive = +props.activeItems.square === +squareItem.id

                            return <SquareItem key={squareItem.id}
                                               isActive={isActive}
                                               isCollected={isCollected}
                                               squareItem={squareItem}
                                               setModalVisible={setModalVisible}/>
                        })
                    }
                </SquaresScrollContainer>
                <SquareCardLast />
            </SquaresScroll>
            {Model()}
        </Square>
    );
}

const Square = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`

const SquaresScroll = styled.ScrollView`
  display: flex;
`

const SquaresScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`

const SquareCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default SquaresTab;