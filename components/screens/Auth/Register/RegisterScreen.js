import React, { useContext, useRef, useState } from 'react'
import {Ionicons} from '@expo/vector-icons'
import styled from 'styled-components';
import mainBg from '../../../../assets/bg/main_bg.jpg'
import BackgroundWrapper from '../../../common/BackgroundWrapper/BackgroundWrapper';
import Text from '../../../common/Text/Text';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { UserContext } from '../../../utils/UserProvider';
import { postRegisterApi } from '../../../protocol/API/API';
import C_LOGIN from '../../../protocol/messages/clients/C_LOGIN';

const RegisterScreen = () => {
  const refEmail = useRef()
  const refPassword = useRef()

  const navigation = useNavigation()
  const { login } = useContext(UserContext);
  const [inputData, setInputChange] = useState({
    username: '',
    password: '',
    email: ''
  })

  const onChangeInputs = (name, event) =>{
    setInputChange({...inputData, [name]: event})
  }

  const nextFieldFocus = (type) =>{
    if(type === 'Email'){
      refEmail.current.focus();
    } else if(type === 'Password'){
      refPassword.current.focus();
    }
  }

  const hendlerRegister = async () =>{
    const data = await postRegisterApi(inputData.username, inputData.email, inputData.password)

    if(data && data.success){
      login(data.token, data.user.id, data.user.username, data.user.password)
      new C_LOGIN(data.user.username,data.user.password)
    } else {
      alert('Register is failed check your name email and password')
    }
  }

  return (
    <BackgroundWrapper gackground={mainBg}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
        <Container>
          <GameBack onPress={()=>{navigation.goBack()}}>
              <Ionicons name='arrow-back' size={38} color={'#000'} />
          </GameBack>
          <InputsContainer>
            <Name placeholder='Name' 
                  placeholderTextColor='#838383' 
                  returnKeyType='next' 
                  onChangeText={(value)=> onChangeInputs('username',value)}
                  onSubmitEditing={()=> nextFieldFocus('Email')}/>
            <Email ref={refEmail}
                  placeholder='Email'
                  placeholderTextColor='#838383' 
                  returnKeyType='next' 
                  onChangeText={(value)=> onChangeInputs('email',value)}
                  onSubmitEditing={()=> nextFieldFocus('Password')} />
            <Password ref={refPassword}
                      placeholder='Password' 
                      placeholderTextColor='#838383' 
                      secureTextEntry={true} 
                      returnKeyType='go' 
                      onChangeText={(value)=> onChangeInputs('password',value)}
                      onSubmitEditing={hendlerRegister} />
          </InputsContainer>
          <BtnContainer>
            <RegisterBtn onPress={hendlerRegister}><Text small heavy color='#fff'>Register</Text></RegisterBtn>
          </BtnContainer>
        </Container>
      </TouchableWithoutFeedback>
    </BackgroundWrapper>
  )
}

const Container = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
`
const GameBack = styled.TouchableOpacity`
    position: absolute;
    top: 20px;
    left: 10px;
`
const InputsContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`
const BtnContainer = styled.View`
  align-items: center;
  justify-content: center;
`
const Name = styled.TextInput`
  width: 70%;
  height: 50px;
  margin: 10px auto;
  padding: 5px 20px;
  color: #c6c6c6;
  background-color: #404040;
  border-radius: 50px;
  justify-content: center;
  border: 2px solid rgb(255,157,77);
`
const Email = styled.TextInput`
  width: 70%;
  height: 50px;
  margin: 10px auto;
  padding: 5px 20px;
  color: #c6c6c6;
  background-color: #404040;
  border-radius: 50px;
  justify-content: center;
  border: 2px solid rgb(255,157,77);
`
const Password = styled.TextInput`
  width: 70%;
  height: 50px;
  margin: 10px auto;
  padding: 5px 20px;
  color: #c6c6c6;
  background-color: #404040;
  border-radius: 50px;
  justify-content: center;
  border: 2px solid rgb(255,157,77);
`
const RegisterBtn = styled.TouchableOpacity`
  background-color:rgb(255,157,77);
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 50px;
  margin-top: 30px;
`

export default RegisterScreen