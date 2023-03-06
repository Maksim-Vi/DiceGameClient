import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import SquareItem from "./SquareItem";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import ModalChildrenBuy from "../../../../common/ModalWindows/ModalChildren/ModalChildrenBuy";
import {useSelector} from "react-redux";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";

const SquaresTab = (props) => {

    const user = useSelector(state=> selectMyUser(state))
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
            <ModalWrapper modalBG={'default'} height={400} modalVisible={modal.visible} setModalVisible={()=> setModalVisible(false)}>
                <ModalChildrenBuy titleItemName={modal.modalName} 
                                  openItem={modal.openItem} 
                                  type={'squares'}
                                  setModalVisible={setModalVisible}/>
            </ModalWrapper>
        )
    }

    return (
        <Square>
            <SquaresScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <SquaresScrollContainer>
                    {props.squares &&
                        [...props.squares]
                            .filter(item => item.available !== 'false' || user.admin)
                            .sort((a,b)=> a.sortIndex > b.sortIndex ? 1 : -1)
                            .reduce((acc, squareItem, index)=>{

                                const isCollected = props.availableItems.squares.includes(+squareItem.id)
                                const isActive = +props.activeItems.square === +squareItem.id
                                const isLocked = squareItem.lvlUnlock > user.experience.lvl
                                const isSale = squareItem.isSale === 'true'

                                acc.push(<SquareItem key={squareItem.id}
                                                     isActive={isActive}
                                                     isCollected={isCollected}
                                                     isLocked={isLocked}
                                                     isSale={isSale}
                                                     squareItem={squareItem}
                                                     setModalVisible={setModalVisible}/>
                                )
                                return acc;
                            },[])
                    }
                </SquaresScrollContainer>
                <SquareCardLast />
            </SquaresScroll>
            {Model()}
        </Square>
    );
}

const Square = styled.View`
  flex: .83;
  display: flex;
  width: 100%;
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