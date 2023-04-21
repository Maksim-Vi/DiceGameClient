import React, {useEffect, useState} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import Text from '../../common/Text/Text'
import {useNavigation} from '@react-navigation/native'
import LoginScreen from './Login/LoginScreen'
import {postLoginApi} from '../../protocol/API/API'
import {Keyboard, Linking, Platform, TouchableWithoutFeedback} from 'react-native'
import Divider from "../../common/Divider/Divider";
import {useForm} from 'react-hook-form'
import bag from '../../../assets/bg/main_bg.jpg'
import appJSON from '../../../app.json'
import GoogleAuth from "./Google/GoogleAuth";
import {setInfoPopup} from "../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Sounds, {soundsType} from "../../utils/Sounds";
import Logo from "../../common/Logo/Logo";
import TextWithoutShadow from "../../common/Text/TextWithoutShadow";

const AuthScreen = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [disableBtn, setDisableBtn] = useState(false)
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            password: ''
        }
    });

    const handlerLogin = async (dataForm) => {
        Sounds.loadAndPlayFile(soundsType.click2)
        setDisableBtn(true)
        const data = await postLoginApi(dataForm.name, dataForm.password)

        if (data && data.success) {
            setDisableBtn(false)
            navigation.navigate('LoadingProject')
        } else {
            setDisableBtn(false)
            dispatch(setInfoPopup({visible: true, data: {text: data.message}}))
        }
    }

    const getDevType = () =>{
       //console.log('ANSWER', process.env.APP_TYPE)
       return process.env.APP_TYPE === 'development'
           ? process.env.APP_TYPE + ':game version:'
           : 'game version:'
    }

    const getVersion = () =>{
        return appJSON.expo.version
    }

    const getVersionIndex = () =>{
        if(Platform.OS === 'android'){
            return `:${appJSON.expo.android.versionCode}`
        } else if(Platform.OS === 'ios'){
            return `:0${1}`
        }
    }

    const openPolicy = async () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        Linking.openURL('https://knockydice-server.onrender.com/private-policy').catch(err=>{
            console.log('policy error')
        })
    }

    const handlerRegister = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        navigation.navigate('RegisterScreen')
    }

    return (
        <BackgroundWrapper gackground={bag}>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
                <AuthContainer>
                    <Logo />
                    <LoginScreen control={control} errors={errors}/>
                    <ButtonContainer>
                        <LoginBtn disabled={disableBtn} onPress={handleSubmit(handlerLogin)}>
                            <Text setShadow={true} small heavy color='#fff' center>Login</Text>
                        </LoginBtn>
                        <Divider text={'or'} padding={10} color={'black'}/>
                        <RegisterBtn onPress={handlerRegister}>
                            <Text setShadow={true} small heavy color='#fff' center>Register</Text>
                        </RegisterBtn>
                        <GoogleAuth />
                        <TouchableWithoutFeedback onPress={openPolicy} accessible={false}>
                            <Text setShadow small blod>Privacy Policy</Text>
                        </TouchableWithoutFeedback>
                    </ButtonContainer>

                        <TextPlatform blod small color={'#fff'}>
                            {getDevType()}{getVersion()}{getVersionIndex()}
                        </TextPlatform>

                </AuthContainer>
            </TouchableWithoutFeedback>
        </BackgroundWrapper>
    )
}

const AuthContainer = styled.View`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonContainer = styled.View`
  width: 100%;
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

const TextPlatform = styled(TextWithoutShadow)`
  position: absolute;
  right: 20px;
  bottom: 20px;
`

export default AuthScreen