import React, {useContext} from 'react';
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {useWindowDimensions} from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import Text from "../../../../common/Text/Text";
import {setDeleteAccountPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import styled from "styled-components";
import ButtonWithText from "../../../../common/Buttons/ButtonWithText";
import {deleteAccountApi} from "../../../../protocol/API/API";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {UserContext} from "../../../../utils/UserProvider";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";

const DeleteAccount = () => {

    const {logout} = useContext(UserContext)
    const myUser = useSelector(selectMyUser)
    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const closeModal = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setDeleteAccountPopup({visible: false, data: null}))
    }

    const deleteAcc = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        deleteAccountApi(myUser.id).then((data)=>{
            if(data.success){
                logout()
            }

            dispatch(setDeleteAccountPopup({visible: false, data: null}))
        }).catch(()=>{
            dispatch(setDeleteAccountPopup({visible: false, data: null}))
        })
    }

    return <ModalWrapper modalBG={'default'} width={width - 20} height={height / 3} modalVisible={true} setModalVisible={closeModal}>
        <Container>
            <DeleteContainer>
                <Text setShadow blod large center>Are you sure that you wanna delete your account?</Text>
                <Text setShadow blod large center>If you delete account, your progress in game will be lost!</Text>
            </DeleteContainer>
            <BtnsContainer>
                <ButtonWithText width={'45%'}
                                height={'40px'}
                                color={'#da4747'}
                                text={'I wanna delete'}
                                clickHandler={deleteAcc}/>
                <ButtonWithText width={'45%'}
                                height={'40px'}
                                color={'#5acb57'}
                                text={'I am still thinking'}
                                clickHandler={closeModal}/>
            </BtnsContainer>
        </Container>
    </ModalWrapper>
}

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
`
const DeleteContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80%;
  margin-top: 20px;
  padding: 10px 30px;
  background-color: rgba(175, 82, 52, 0.64);
  border-radius: 10px;
`

const BtnsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 80%;
  height: 40%;
`
const mapStateToProps = (state) => ({
    deleteText1: selectTranslation(state,'TR_DELETE_ACCOUNT_TEXT1'),
    deleteText2: selectTranslation(state,'TR_DELETE_ACCOUNT_TEXT2'),
    confirm: selectTranslation(state,'TR_DELETE_ACCOUNT_CONFIRM'),
    cancel: selectTranslation(state,'TR_DELETE_ACCOUNT_CANCEL'),
});

export default connect(mapStateToProps)(DeleteAccount);
