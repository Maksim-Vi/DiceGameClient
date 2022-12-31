import React, { useState } from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import styled from 'styled-components'
import Text from '../../common/Text/Text'
import { useNavigation } from '@react-navigation/native'
import LoginScreen from './Login/LoginScreen'
import { postLoginApi } from '../../protocol/API/API'
import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native'
import C_LOGIN from '../../protocol/messages/clients/C_LOGIN'
import Divider from "../../common/Divider/Divider";
import { useForm } from 'react-hook-form'

const AuthScreen = () => {
  const navigation = useNavigation()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      password: ''
    }
  });

  const onChangeInputs = (name, event) =>{
    setInputChange({...inputData, [name]: event})
  }

  const hendlerLogin = async (dataForm) =>{
    const data = await postLoginApi(dataForm.name,dataForm.password)
    
    if(data && data.success){
     navigation.navigate('LoadingProject')
     new C_LOGIN(data.user.username,data.user.password)
    } else {
      alert(data.message)
    }
  }

  const hendlerRegister = () =>{
    navigation.navigate('RegisterScreen')
  }

  return (
      <BackgroundWrapper gackground={mainBg}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
          <AuthContainer>
            <LoginScreen hendlerLogin={hendlerLogin} 
                         onChangeInputs={onChangeInputs}
                         control={control} 
                         errors={errors} />
            <ButtonContainer >
              <LoginBtn onPress={handleSubmit(hendlerLogin)}><Text small heavy color='#fff' center>Login</Text></LoginBtn>
              <Divider text={'or'} padding={10} color={'black'}/>
              <RegisterBtn onPress={hendlerRegister}><Text small heavy color='#fff' center>Register</Text></RegisterBtn>
            </ButtonContainer>
          </AuthContainer>
        </TouchableWithoutFeedback>
      </BackgroundWrapper>  
  )
}

const AuthContainer = styled.View`
  flex: 1;
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
  background-color: rgb(255,157,77);
  border-radius: 10px;
  border: 1px solid #000;
  width: 80%;
  height: 40px;
`
const RegisterBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color:rgb(255,157,77);
  border-radius: 10px;
  border: 1px solid #000;
  width: 80%;
  height: 40px;
`

export default AuthScreen