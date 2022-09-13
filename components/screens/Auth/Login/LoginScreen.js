import React, { useRef } from 'react';
import styled from 'styled-components';

const LoginScreen = (props) => {

  const refPass = useRef()

  const nextFieldFocus = () =>{
    refPass.current.focus();
  }

  return (
        <InputsContainer>
          <Name placeholder='Name' 
                placeholderTextColor='#838383' 
                returnKeyType='next' 
                value={props.inputData.name}
                onChangeText={(value)=> props.onChangeInputs('name',value)}
                onSubmitEditing={nextFieldFocus}/>
          <Password ref={refPass}
                    placeholder='Password' 
                    placeholderTextColor='#838383' 
                    secureTextEntry={true} 
                    returnKeyType='go' 
                    value={props.inputData.password}
                    onChangeText={(value)=> props.onChangeInputs('password',value)}
                    onSubmitEditing={props.hendlerLogin} 
                    />
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
