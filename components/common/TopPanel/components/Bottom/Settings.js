import React, {useContext, useState} from "react";
import styled from "styled-components";
import exit from "../../../../../assets/topPanel/settingsPopup/exit.png";
import goBack from "../../../../../assets/topPanel/settingsPopup/back.png";
import muteSounds from "../../../../../assets/topPanel/settingsPopup/silent.png";
import unmuteSounds from "../../../../../assets/topPanel/settingsPopup/high-volume.png";
import support from "../../../../../assets/topPanel/settingsPopup/support.png";
import {UserContext} from "../../../../utils/UserProvider";
import C_LEAVE_SOCKET from "../../../../protocol/messages/clients/C_LEAVE_SOCKET";
import {setSettingsMenuPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Text from "../../../Text/Text";
import {getCurrentData} from "../../../../utils/utils";

const Settings = (props) =>{

    const [mute, setMute] = useState(false)
    const dispatch = useDispatch()
    const { logout } = useContext(UserContext);

    const Logout = () =>{
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
        new C_LEAVE_SOCKET()
        logout()
    }

    return (
        <SettingsContainer>
            <ContentContainer>
                <Btn onPress={props.closeModal} activeOpacity={0.9}>
                    <ReturnContainer  style={{ borderBottomWidth: 3 }}>
                        <Img source={goBack} resizeMode='stretch'/>
                        <Text  large blod center color={'#0c6fb6'}>return to game</Text>
                    </ReturnContainer>
                </Btn>
                <Btn onPress={()=>setMute(!mute)} activeOpacity={0.9}>
                    <SoundsContainer  style={{ borderBottomWidth: 3 }}>
                        <Img source={mute ? muteSounds : unmuteSounds} resizeMode='stretch'/>
                        <Text large blod center color={'#0c6fb6'}>mute/unmute sounds</Text>
                    </SoundsContainer>
                </Btn>
                <Btn onPress={()=>console.log('support')} activeOpacity={0.9}>
                    <SupportContainer style={{ borderBottomWidth: 3 }}>
                        <Img source={support} resizeMode='stretch'/>
                        <Text large blod center color={'#0c6fb6'}>support</Text>
                    </SupportContainer>
                </Btn>
                <Btn onPress={Logout} activeOpacity={0.9}>
                    <LeaveContainer style={{ borderBottomWidth: 3 }}>
                        <Img source={exit} resizeMode='stretch'/>
                        <Text large blod center color={'#0c6fb6'}>leave game</Text>
                    </LeaveContainer>
                </Btn>
            </ContentContainer>

            <Info>
                <Text small center color={'#000'}>Knocky Dice | development from 11.02.2022 to {getCurrentData()}</Text>
            </Info>
        </SettingsContainer>
    )
}

const SettingsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  margin: 5px;
`

const ContentContainer = styled.View`
  display: flex;
  width: 100%;
`

const ReturnContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  background-color: rgba(17, 192, 113, 0.59);
  border: 1px solid rgb(255, 157, 77);
  margin: 5px;
  border-radius: 10px;
  padding: 5px 20px;
`
const SoundsContainer = styled(ReturnContainer)``
const LeaveContainer = styled(ReturnContainer)``
const SupportContainer = styled(ReturnContainer)``

const Info = styled.View`
  width: 50%;
`

const Btn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  width: 100%;
`

const Img = styled.Image`
    width: 30px;
    height: 30px;
    margin-right: 20px;
`

export default Settings