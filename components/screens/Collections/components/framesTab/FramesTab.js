import React from 'react';
import styled from "styled-components";
import {StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import FrameItem from './FrameItem';
import { setCollectBuyItemPopup } from '../../../../redux/reducers/popups/PopupsReducer';

const FramesTab = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state=> selectMyUser(state))
  
    const setModalVisible = (isVisible, item) =>{
      dispatch(setCollectBuyItemPopup({visible: true, data: {
          modalName: 'Frames',
          openItem: item
      }}))
  }

    return (
        <Frames>
            <FramesScroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <FramesScrollContainer>
                    {props.frames &&
                          [...props.frames]
                              .sort((a,b)=> a.sortIndex > b.sortIndex ? 1 : -1)
                              .reduce((acc, frameItem, index)=>{

                                  const isCollected = props.availableItems.frames.includes(+frameItem.id)
                                  const isActive = +props.activeItems.frame === +frameItem.id
                                  const isLocked = frameItem.lvlUnlock > user.experience.lvl
                                  const isSale = frameItem.isSale === 'true'

                                  if(
                                      (frameItem.available && frameItem.available === 'true') ||
                                      (frameItem.available && frameItem.available !== 'true' && user.admin === 'true')
                                  ){
                                      acc.push(<FrameItem key={frameItem.id}
                                                          isActive={isActive}
                                                          isCollected={isCollected}
                                                          isLocked={isLocked}
                                                          isSale={isSale}
                                                          frameItem={frameItem}
                                                          setModalVisible={setModalVisible}/>
                                      )
                                  }

                                  return acc;
                              },[])
                      }
                </FramesScrollContainer>
                <FramesCardLast />
            </FramesScroll>
        </Frames>
    );
}

const Frames = styled.View`
  position: relative;
  flex: .83;
  display: flex;
  width: 100%;
`

const FramesScroll = styled.ScrollView`
  display: flex;
`

const FramesScrollContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 10px;
`

const FramesCardLast = styled.View`
  display: flex;
  width: 40%;
  height: 180px;
`

const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
    }
})

export default FramesTab;