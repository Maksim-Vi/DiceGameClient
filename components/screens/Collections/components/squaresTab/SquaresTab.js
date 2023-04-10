import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import SquareItem from "./SquareItem";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import ModalChildrenBuy from "../../../../common/ModalWindows/ModalChildren/ModalChildrenBuy";
import {useDispatch, useSelector} from "react-redux";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {setCollectBuyItemPopup} from "../../../../redux/reducers/popups/PopupsReducer";

const SquaresTab = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state=> selectMyUser(state))

    const setModalVisible = (isVisible, item) =>{
        dispatch(setCollectBuyItemPopup({visible: true, data: {
            modalName: 'Squares',
            openItem: item
        }}))
    }

    return (
        <Square>
            <SquaresScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <SquaresScrollContainer>
                    {props.squares &&
                        [...props.squares]
                            .sort((a,b)=> a.sortIndex > b.sortIndex ? 1 : -1)
                            .reduce((acc, squareItem, index)=>{

                                const isCollected = props.availableItems.squares.includes(+squareItem.id)
                                const isActive = +props.activeItems.square === +squareItem.id
                                const isLocked = squareItem.lvlUnlock > user.experience.lvl
                                const isSale = squareItem.isSale === 'true'
                                if(
                                    (squareItem.available && squareItem.available === 'true') ||
                                    (squareItem.available && squareItem.available !== 'true' && user.admin === 'true')
                                ){
                                    acc.push(<SquareItem key={squareItem.id}
                                                         isActive={isActive}
                                                         isCollected={isCollected}
                                                         isLocked={isLocked}
                                                         isSale={isSale}
                                                         squareItem={squareItem}
                                                         setModalVisible={setModalVisible}/>
                                    )
                                }

                                return acc;
                            },[])
                    }
                </SquaresScrollContainer>
                <SquareCardLast />
            </SquaresScroll>
        </Square>
    );
}

const Square = styled.View`
  position: relative;
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