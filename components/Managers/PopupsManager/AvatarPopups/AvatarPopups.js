import { produceWithPatches } from 'immer'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import images from '../../../../assets/dynamicLoadImage'
import Avatar from '../../../common/Avatars/Avatar'
import ButtonWithText from '../../../common/Buttons/ButtonWithText'
import ModalWrapper from '../../../common/ModalWindows/ModalWrapper'
import Text from '../../../common/Text/Text'
import { setNewAvatar } from '../../../protocol/API/API'
import { setAvatarPopup } from '../../../redux/reducers/popups/PopupsReducer'

const AvatarPopups = (props) =>{

    const dispatch = useDispatch()

    const closeModal = () =>{
        dispatch(setAvatarPopup({visible: false, data: null}))
    }

    const selectAvatar = async (avaId) =>{
        if(!props.user) return null

        let avatarId = null

        if(avaId > 0){
            avatarId = avaId
        }

        await setNewAvatar(props.user.username,avatarId)
    }

    const renderAvatarPopup = () =>{
        return <AvatarContainer>
             <Text title blod color={'blue'} center>Avatars</Text>
             <Scroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <AvatarsGrid>
                    {images.avatars.map((ava,index)=>{
                        return <AvaCard style={{ borderBottomWidth: 8 }}>
                            <Text center>ava {index}</Text>
                            <Ava>
                                <AvatarImg source={ava} resizeMode={ 'stretch'} />
                            </Ava>
                            <ButtonWithText width={'80%'} text={'select'} clickHandler={() => selectAvatar(index)}/>
                        </AvaCard>
                    })}
                </AvatarsGrid>
             </Scroll>
           
        </AvatarContainer>
    }

    return <ModalWrapper modalBG={'default'} width={'100%'} height={'70%'} modalVisible={true} setModalVisible={closeModal}>
           {renderAvatarPopup()}
    </ModalWrapper>
}

const AvatarContainer = styled.View`
  position: relative;
  padding-top: 20px;
  width: 100%;
`
const Scroll = styled.ScrollView`
  display: flex;
  height: 90%;
`
const AvatarsGrid = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`

const AvaCard = styled.View`
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

const Ava = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
`
const AvatarImg = styled.Image`
  width: 100px;
  height: 100px;
`
const styles = StyleSheet.create({
    scroll:{
       display: 'flex',
    }
})

export default AvatarPopups