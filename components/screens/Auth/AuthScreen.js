import React, {useEffect, useState} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import Text from '../../common/Text/Text'
import {useNavigation} from '@react-navigation/native'
import LoginScreen from './Login/LoginScreen'
import {postLoginApi} from '../../protocol/API/API'
import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native'
import C_LOGIN from '../../protocol/messages/clients/C_LOGIN'
import Divider from "../../common/Divider/Divider";
import {useForm} from 'react-hook-form'
import bag from '../../../assets/bg/main_bg.jpg'
import GoogleAuth from "./Google/GoogleAuth";

const AuthScreen = () => {
    const navigation = useNavigation()
    const [disableBtn, setDisableBtn] = useState(false)
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            password: ''
        }
    });

    const onChangeInputs = (name, event) => {
        setInputChange({...inputData, [name]: event})
    }

    const handlerLogin = async (dataForm) => {
        setDisableBtn(true)
        const data = await postLoginApi(dataForm.name, dataForm.password)

        if (data && data.success) {
            setDisableBtn(false)
            navigation.navigate('LoadingProject')
            new C_LOGIN(data.user.username, data.user.password)
        } else {
            setDisableBtn(false)
            alert(data.message)
        }
    }

    const handlerRegister = () => {
        navigation.navigate('RegisterScreen')
    }

    return (
        <BackgroundWrapper gackground={bag}>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
                <AuthContainer>
                    <Text title heavy color={'#fff'} center>Knocky Dice</Text>

                    <LoginScreen onChangeInputs={onChangeInputs}
                                 control={control}
                                 errors={errors}/>
                    <ButtonContainer>
                        <LoginBtn disabled={disableBtn} onPress={handleSubmit(handlerLogin)}><Text small heavy
                                                                                                   color='#fff'
                                                                                                   center>Login</Text></LoginBtn>
                        <Divider text={'or'} padding={10} color={'black'}/>
                        <RegisterBtn onPress={handlerRegister}><Text small heavy color='#fff'
                                                                     center>Register</Text></RegisterBtn>
                        <GoogleAuth/>
                    </ButtonContainer>
                </AuthContainer>
            </TouchableWithoutFeedback>
        </BackgroundWrapper>
    )
}

const AuthContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ButtonContainer = styled.View`
  width: ${Platform.OS === 'ios' ? '100%' : '80%'};
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const LoginBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 157, 77);
  border-radius: 10px;
  border: 1px solid #000;
  width: 80%;
  height: 40px;
  ${props => {
    if (props.disabled) {
      return `
            background-color: gray;
        `
    }
  }}
`
const RegisterBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 157, 77);
  border-radius: 10px;
  border: 1px solid #000;
  width: 80%;
  height: 40px;
`

export default AuthScreen