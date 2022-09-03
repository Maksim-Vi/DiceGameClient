import React, { useContext, useState } from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import styled from 'styled-components'
import Text from '../../common/Text/Text'
import { useNavigation } from '@react-navigation/native'
import LoginScreen from './Login/LoginScreen'
import { postLoginApi } from '../../protocol/API/API'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import { UserContext } from '../../utils/UserProvider'
import C_LOGIN from '../../protocol/messages/clients/C_LOGIN'

const AuthScreen = () => {

  const navigation = useNavigation()
  const { login } = useContext(UserContext);
  const [inputData, setInputChange] = useState({
    name: '',
    password: ''
  })

  const onChangeInputs = (name, event) =>{
    setInputChange({...inputData, [name]: event})
  }

  const hendlerLogin = async () =>{
    const data = await postLoginApi(inputData.name,inputData.password)

    if(data && data.success){
      login(data)
      new C_LOGIN(data.user.username,data.user.password)
    } else {
      alert('Login is failed check your name and password')
    }
  }

  const hendlerRegister = () =>{
    navigation.navigate('RegisterScreen')
  }

  return (
      <BackgroundWrapper gackground={mainBg}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
          <AuthContainer>
            <LoginScreen hendlerLogin={hendlerLogin} onChangeInputs={onChangeInputs} inputData={inputData}/>
            <ButtonContainer >
              <LoginBtn onPress={hendlerLogin}><Text small heavy color='#fff'>Login</Text></LoginBtn>
              <RegisterBtn onPress={hendlerRegister}><Text small heavy color='#fff'>Register</Text></RegisterBtn>
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
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
const LoginBtn = styled.TouchableOpacity`
  background-color: rgb(255,157,77);
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 60px;
`
const RegisterBtn = styled.TouchableOpacity`
  background-color:rgb(255,157,77);
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 50px;
  /* margin-top: 30px; */
`

export default AuthScreen