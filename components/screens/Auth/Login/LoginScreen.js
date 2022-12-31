import React, { useRef } from 'react';
import { Controller } from "react-hook-form";
import styled from 'styled-components';
import Text from '../../../common/Text/Text';

const LoginScreen = (props) => {

  const refPass = useRef()

  const nextFieldFocus = () =>{
    refPass.current.focus();
  }

  const getErrPassword = () =>{
    if(!props.errors.password ) return 

    return props.errors.password.type === 'minLength'
    ? <Text color={'red'}>this field should have more then 6 symbols.</Text>
    : <Text color={'red'}>this field is required.</Text>
  }

  return (
        <InputsContainer>
          <Controller control={props.control} 
                      rules={{ required: true }}
                      name="name"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Name placeholder='Name' 
                              placeholderTextColor='#838383' 
                              returnKeyType='next' 
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              onSubmitEditing={nextFieldFocus}/>
                      )}
          />
          {props.errors.name && <Text color={'red'}>this field is required.</Text>}

          <Controller control={props.control} 
                      rules={{ required: true, minLength: 6 }}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Password ref={refPass}
                                  placeholder='Password' 
                                  placeholderTextColor='#838383' 
                                  secureTextEntry={true}
                                  value={value}
                                  onBlur={onBlur}
                                  onChangeText={onChange} 
                        /> 
                      )}
          />
          {getErrPassword()}

        </InputsContainer>
  )
}

const InputsContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
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
export default LoginScreen;
