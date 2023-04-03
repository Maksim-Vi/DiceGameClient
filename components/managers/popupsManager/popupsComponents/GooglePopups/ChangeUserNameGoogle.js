import React, {useEffect, useState} from 'react';
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {useWindowDimensions} from "react-native";
import styled from "styled-components";
import ButtonWithText from "../../../../common/Buttons/ButtonWithText";
import Text from "../../../../common/Text/Text";
import {useDispatch, useSelector} from "react-redux";
import {postUpdateGoogleUsername} from "../../../../protocol/API/API";
import {
    selectGoogleConfirmUsernamePopup,
    setGoogleConfirmUsernamePopup,
    setInfoPopup
} from "../../../../redux/reducers/popups/PopupsReducer";

const ChangeUserNameGoogle = (props) => {

    const googleConfirmUsernamePopup = useSelector(state => selectGoogleConfirmUsernamePopup(state))
    const [updateUsername, setUpdateUsername] = useState(googleConfirmUsernamePopup.data.username)
    const [error, setError] = useState(null)
    const {height, width} = useWindowDimensions();
    const dispatch = useDispatch()

    const confirm = async () =>{
        if(googleConfirmUsernamePopup.data.username && !error){
            const googleUpdate = await postUpdateGoogleUsername(updateUsername, googleConfirmUsernamePopup.data.email)

            if(googleUpdate && googleUpdate.success){
                closeConfirmPopup()
                navigation.navigate('LoadingProject')
            } else if(!googleUpdate.success && googleUpdate.unAvailable){
                setError(googleUpdate.message)
            } else {
                dispatch(setInfoPopup({visible: true, data: {text: googleUpdate.message}}))
                closeConfirmPopup()
            }
        }
    }

    const updateName = (val) =>{
        if(error) setError(null)
        if(val === 'Bot') setError('this field can not be "Bot"')
        if(val.length > 8) setError('this field should have only 8 characters')

        setUpdateUsername(val)
    }

    const closeConfirmPopup = () =>{
        dispatch(setGoogleConfirmUsernamePopup({visible: false, data: null}))
    }

    useEffect(()=>{
        if(updateUsername && updateUsername.length > 8){
            setError('this field should have only 8 characters')
        }
    }, [])

    return (
        <ModalWrapper modalBG={'default'} width={width - 100} height={height / 4} modalVisible={true}>
            <Container>
                <ChangeNameContainer>
                    <TextTitle setShadow={true} large blod center color={'#ffffff'}>Change or confirm you username</TextTitle>
                    <Name onChangeText={updateName}
                          value={updateUsername}/>
                    {error && <Text small heavy color={'#d92f2f'} center>{error}</Text>}
                </ChangeNameContainer>
                <ButtonContainer>
                    <ButtonWithText clickHandler={closeConfirmPopup} width={'45%'} text={'Leave Game'} color={'#ff6262'}/>
                    <ButtonWithText clickHandler={confirm} width={'45%'} text={'Confirm'} color={'#74ce30'}/>
                </ButtonContainer>
            </Container>
        </ModalWrapper>
    );
};

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`

const TextTitle = styled(Text)`
`

const ChangeNameContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(175, 82, 52, 0.7);
  border-radius: 20px;
  width: 100%;
  height: 80%;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
`

const Name = styled.TextInput`
  width: 80%;
  height: 50px;
  margin: 10px auto;
  padding: 5px 20px;
  color: #c6c6c6;
  background-color: #404040;
  border-radius: 50px;
  justify-content: center;
  border: 2px solid rgb(255, 157, 77);
`

export default ChangeUserNameGoogle;