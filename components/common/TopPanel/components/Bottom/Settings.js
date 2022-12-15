import React, {useContext} from "react";
import styled from "styled-components";
import settings from "../../../../../assets/topPanel/exit.png";
import {UserContext} from "../../../../utils/UserProvider";
import C_LEAVE_SOCKET from "../../../../protocol/messages/clients/C_LEAVE_SOCKET";

const Settings = (props) =>{

    const { logout } = useContext(UserContext);

    const Logout = () =>{
        new C_LEAVE_SOCKET()
        logout()
    }

    return (
        <SettingsContainer>
            <SettingsBtn onPress={Logout}>
                <SettingsImg source={settings} resizeMode='stretch'/>
            </SettingsBtn>
        </SettingsContainer>
    )
}

const SettingsContainer = styled.View`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(13, 64, 194, 0.88);
`

const SettingsBtn = styled.TouchableWithoutFeedback`

`
const SettingsImg = styled.Image`
    margin: auto;
    width: 80%;
    height: 80%;
`

export default Settings