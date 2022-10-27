import React, { useRef } from 'react'
import {Ionicons} from '@expo/vector-icons'
import styled from 'styled-components';
import mainBg from '../../../../assets/bg/main_bg.jpg'
import BackgroundWrapper from '../../../common/BackgroundWrapper/BackgroundWrapper';
import Text from '../../../common/Text/Text';
import { useNavigation } from '@react-navigation/native';
import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native';
import { postRegisterApi } from '../../../protocol/API/API';
import { Controller, useForm } from 'react-hook-form';

const RegisterScreen = () => {
  const refEmail = useRef()
  const refPassword = useRef()

  const navigation = useNavigation()

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: ''
    }
  });

  const nextFieldFocus = (type) =>{
    if(type === 'Email'){
      refEmail.current.focus();
    } else if(type === 'Password'){
      refPassword.current.focus();
    }
  }

  const hendlerRegister = async (dataForm) =>{
    const data = await postRegisterApi(dataForm.username, dataForm.email, dataForm.password)

    if(data && data.success){
      navigation.goBack()
    } else {
      alert(data.message)
    }
  }

  const getErrEmail = () =>{
    if(!errors.email ) return 

    return errors.email.type === 'pattern'
    ? <Text color={'red'}>this field should have correct email type</Text>
    : <Text color={'red'}>this field is required.</Text>
  }

  const getErrPassword = () =>{
    if(!errors.password ) return 

    return errors.password.type === 'minLength'
    ? <Text color={'red'}>this field should have more then 6 symbols.</Text>
    : <Text color={'red'}>this field is required.</Text>
  }

  return (
    <BackgroundWrapper gackground={mainBg}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
        <Container>
          <GameBack onPress={()=>{navigation.goBack()}}>
              <Ionicons name='arrow-back' size={38} color={'#000'} />
          </GameBack>
          <InputsContainer>
            <Controller control={control} 
                      rules={{ required: true }}
                      name="username"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Name placeholder='Name' 
                              placeholderTextColor='#838383' 
                              returnKeyType='next' 
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              onSubmitEditing={()=> nextFieldFocus('Email')}/>
                      )}
             />
            {errors.username && <Text color={'red'}>this field is required.</Text>}

            <Controller control={control} 
                      rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Email ref={refEmail} 
                               placeholder='Email'
                               placeholderTextColor='#838383' 
                               returnKeyType='next'
                               value={value}
                               onBlur={onBlur}
                               onChangeText={onChange}
                               onSubmitEditing={()=> nextFieldFocus('Password')}/>
                      )}
             />
            {getErrEmail()}

            <Controller control={control} 
                      rules={{ required: true, minLength: 6 }}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Password ref={refPassword}
                                  placeholder='Password'
                                  placeholderTextColor='#838383' 
                                  secureTextEntry={true} 
                                  value={value}
                                  onBlur={onBlur}
                                  onChangeText={onChange}/>
                      )}
             />
             {getErrPassword()}
          </InputsContainer>
          <BtnContainer>
            <RegisterBtn onPress={handleSubmit(hendlerRegister)}>
              <Text small heavy color='#fff'>Register</Text>
            </RegisterBtn>
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
  width: ${Platform.OS === 'ios' ? '100%' : '80%'};
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
  border: 2px solid rgb(255,157,77);
`
const Email = styled.TextInput`
  width: 80%;
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
  width: 80%;
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
  align-items: center;
  justify-content: center;
  background-color:rgb(255,157,77);
  border-radius: 10px;
  border: 1px solid #000;
  width: 80%;
  height: 40px;
`

export default RegisterScreen