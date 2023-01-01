import React, {useRef, useState} from 'react';
import {Controller} from "react-hook-form";
import styled from 'styled-components';
import Text from '../../../common/Text/Text';
import showPass from '../../../../assets/loadGame/show.png'
import hidePass from '../../../../assets/loadGame/hide.png'
import ButtonImage from "../../../common/Buttons/ButtonImage";

const LoginScreen = (props) => {

    const [showPassword, setShowPassword] = useState(true)
    const refPass = useRef()

    const nextFieldFocus = () => {
        refPass.current.focus();
    }

    const getErrPassword = () => {
        if (!props.errors.password) return

        return props.errors.password.type === 'minLength'
            ? <Text color={'red'}>this field should have more then 6 symbols.</Text>
            : <Text color={'red'}>this field is required.</Text>
    }

    const triggerShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    return (
        <InputsContainer>
            <Controller control={props.control}
                        rules={{required: true}}
                        name="name"
                        render={({field: {onChange, onBlur, value}}) => (
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
                        rules={{required: true, minLength: 6}}
                        name="password"
                        render={({field: {onChange, onBlur, value}}) => (
                            <PasswordContainer>
                                <Password ref={refPass}
                                          placeholder='Password'
                                          placeholderTextColor='#838383'
                                          secureTextEntry={showPassword}
                                          value={value}
                                          onBlur={onBlur}
                                          onChangeText={onChange}
                                />
                                <ViewPassword>
                                    <ButtonImage width={25} height={25} image={showPassword ? showPass : hidePass} clickHandler={triggerShowPassword}/>
                                </ViewPassword>
                            </PasswordContainer>
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
  border: 2px solid rgb(255, 157, 77);
`
const PasswordContainer = styled.View`
  position: relative;
  width: 100%;
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
  border: 2px solid rgb(255, 157, 77);
`
const ViewPassword = styled.View`
  position: absolute;
  right: 50px;
  top: 17px;
`
export default LoginScreen;
