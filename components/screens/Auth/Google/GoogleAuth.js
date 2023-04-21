import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Text from "../../../common/Text/Text";
import * as Google from "expo-auth-session/providers/google";
import {postGoogleLoginOrRegister} from "../../../protocol/API/API";
import {useDispatch} from "react-redux";
import {setGoogleConfirmUsernamePopup, setInfoPopup} from "../../../redux/reducers/popups/PopupsReducer";
import Sounds, {soundsType} from "../../../utils/Sounds";

const GoogleAuth = (props) => {

    const dispatch = useDispatch()
    const [disableBtn, setDisableBtn] = useState(false)
    const [request, response, promptAsync] = Google.useAuthRequest(
        {
            androidClientId: "1099319501210-58fuql0uvef2o44vhla2uscid51enl8v.apps.googleusercontent.com",
            iosClientId: "1099319501210-b1957g9adhkvoqkimq9h9j6mud5doqjp.apps.googleusercontent.com",
            expoClientId: "1099319501210-362q2oj64cfbg73o2c2ncpjnra07788j.apps.googleusercontent.com",
        },
    );

    const handlerGoogle = () =>{
        setDisableBtn(true)
        Sounds.loadAndPlayFile(soundsType.click2)
        promptAsync({ useProxy: false, showInRecents: true })
    }

    const getGoogleUserData = async (response) =>{
        if(response.authentication){
            let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${response.authentication.accessToken}` }
            });

            userInfoResponse.json().then(async data => {
                const password = data.id + 'googleLoginKnockyDice'
                const googleUserData = await postGoogleLoginOrRegister(data.name, password, data.email, data.picture)

                if(googleUserData && googleUserData.success && (googleUserData.create || !googleUserData.user.isFinishRegistration) ){
                    dispatch(setGoogleConfirmUsernamePopup({visible: true, data: {username: googleUserData.user.username, email: googleUserData.user.email}}))
                } else if(googleUserData && googleUserData.success && (!googleUserData.create || googleUserData.user.isFinishRegistration)) {
                    navigation.navigate('LoadingProject')
                } else {
                    dispatch(setInfoPopup({visible: true, data: {text: googleUserData.message}}))
                }
            });
        }
        setDisableBtn(false)
    }

    useEffect(() => {
        if (response?.type === "success") {
            getGoogleUserData(response)
        } else {
            setDisableBtn(false)
        }

        return ()=> setDisableBtn(false)
    }, [response]);


    return <GoogleBtn disabled={!request || disableBtn} onPress={handlerGoogle}><Text small heavy color='#000' center>Google login</Text></GoogleBtn>
}

const GoogleBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: rgb(229, 229, 229);
  border-radius: 10px;
  border: 1px solid #000;
  width: 80%;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  ${props=>{
    if(props.disabled){
        return `
              background-color: gray;
          `
    }
}}
`

export default GoogleAuth;