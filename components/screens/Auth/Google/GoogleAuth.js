import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Text from "../../../common/Text/Text";
import * as Google from "expo-auth-session/providers/google";
import {postGoogleLoginOrRegister} from "../../../protocol/API/API";
import C_LOGIN from "../../../protocol/messages/clients/C_LOGIN";
import {makeRedirectUri} from "expo-auth-session";

const GoogleAuth = (props) => {

    const [request, response, promptAsync] = Google.useAuthRequest(
        {
            androidClientId: "1099319501210-58fuql0uvef2o44vhla2uscid51enl8v.apps.googleusercontent.com",
            iosClientId: "1099319501210-b1957g9adhkvoqkimq9h9j6mud5doqjp.apps.googleusercontent.com",
            expoClientId: "1099319501210-362q2oj64cfbg73o2c2ncpjnra07788j.apps.googleusercontent.com",
            //redirectUri: makeRedirectUri({ useProxy: true })
        },
        //{ useProxy: true }
    );

    const handlerGoogle = () =>{
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

                if(googleUserData && googleUserData.success){
                    navigation.navigate('LoadingProject')
                    new C_LOGIN(googleUserData.user.username,googleUserData.user.password)
                } else {
                    alert(data.message)
                }
            });
        }
    }

    useEffect(() => {
        if (response?.type === "success") {
            getGoogleUserData(response)
        }
    }, [response]);


    return  <GoogleBtn disabled={!request} onPress={handlerGoogle}><Text small heavy color='#000' center>Google login</Text></GoogleBtn>
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
  ${props=>{
    if(props.disabled){
        return `
              background-color: gray;
          `
    }
}}
`

export default GoogleAuth;