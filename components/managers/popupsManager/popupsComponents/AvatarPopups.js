import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import {connect, useDispatch} from 'react-redux'
import styled from 'styled-components'
import images from '../../../../assets/dynamicLoadImage'
import ButtonWithText from '../../../common/Buttons/ButtonWithText'
import ModalWrapper from '../../../common/ModalWindows/ModalWrapper'
import Text from '../../../common/Text/Text'
import { setNewAvatar } from '../../../protocol/API/API'
import { setAvatarPopup } from '../../../redux/reducers/popups/PopupsReducer'
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import Sounds, {soundsType} from "../../../utils/Sounds";

const AvatarPopups = (props) =>{
 
    const { height, width } = useWindowDimensions();
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
             <Text setShadow={true} title blod color={'#fefefe'} center>{props.avatarsText}</Text>
             <Scroll showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <AvatarsGrid>
                    {images.avatars.map((ava,index)=>{
                        
                        const isActive = +index === +props.user.avatar || (+props.user.avatar === null && index === 0)
                        
                        return <AvaCard key={index} style={{ borderBottomWidth: 8 }}>
                            <Text center>{props.ava} {index}</Text>
                            <Ava>
                                <AvatarImg source={ava} resizeMode={'stretch'} />
                            </Ava>
                            <ButtonWithText width={'80%'} 
                                            disabled={isActive}
                                            text={isActive ? props.selected : props.select}
                                            clickHandler={() => selectAvatar(index)}/>
                        </AvaCard>
                    })}
                </AvatarsGrid>
             </Scroll>
           
        </AvatarContainer>
    }

    return <ModalWrapper modalBG={'default'} width={width - 35} height={height / 1.5} modalVisible={true} setModalVisible={closeModal}>
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
  height: 85%;
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

const mapStateToProps = (state) => ({
    avatarsText: selectTranslation(state,defaultTranslation.TR_AVATAR),
    select: selectTranslation(state,defaultTranslation.TR_SELECT),
    selected: selectTranslation(state,defaultTranslation.TR_SELECTED),
    ava: selectTranslation(state,defaultTranslation.TR_AVA),
})

export default connect(mapStateToProps)(AvatarPopups);