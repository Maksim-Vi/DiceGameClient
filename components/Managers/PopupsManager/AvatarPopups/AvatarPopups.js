import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ModalWrapper from '../../../common/ModalWindows/ModalWrapper'
import Text from '../../../common/Text/Text'
import { setAvatarPopup } from '../../../redux/reducers/popups/PopupsReducer'

const AvatarPopups = () =>{

    const dispatch = useDispatch()

    const closeModal = () =>{
        dispatch(setAvatarPopup({visible: false, data: null}))
    }

    const renderAvatarPopup = () =>{
        return <AvatarContainer>
             <Text>avatar modal</Text>
        </AvatarContainer>
    }

    return <ModalWrapper modalBG={'default'} width={'100%'} height={'70%'} modalVisible={true} setModalVisible={closeModal}>
           {renderAvatarPopup()}
    </ModalWrapper>
}

const AvatarContainer = styled.View`
  position: relative;
`


export default AvatarPopups