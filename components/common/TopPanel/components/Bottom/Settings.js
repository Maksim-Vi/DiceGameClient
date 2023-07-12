import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import exit from "../../../../../assets/topPanel/settingsPopup/exit.png";
import news from "../../../../../assets/news/news-icon.png"
import goBack from "../../../../../assets/topPanel/settingsPopup/back.png";
import muteSounds from "../../../../../assets/topPanel/settingsPopup/silent.png";
import tutorial from "../../../../../assets/tutorial/dicy.png";
import unmuteSounds from "../../../../../assets/topPanel/settingsPopup/high-volume.png";
import support from "../../../../../assets/topPanel/settingsPopup/support.png";
import deleteAcc from "../../../../../assets/topPanel/settingsPopup/delete-acc.png";
import lang from "../../../../../assets/topPanel/settingsPopup/language.png";
import {UserContext} from "../../../../utils/UserProvider";
import C_LEAVE_SOCKET from "../../../../protocol/messages/clients/C_LEAVE_SOCKET";
import {
    setDeleteAccountPopup,
    setSettingsMenuPopup,
    setTutorialPopup
} from "../../../../redux/reducers/popups/PopupsReducer";
import {connect, useDispatch} from "react-redux";
import Text from "../../../Text/Text";
import {delay, getCurrentData, transitionState} from "../../../../utils/utils";
import {selectSoundsInfo, selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import SelectDropdown from 'react-native-select-dropdown'
import {Linking, StyleSheet} from 'react-native';
import C_CHANGE_LANGUAGE from "../../../../protocol/messages/clients/C_CHANGE_LANGUAGE";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import C_CHANGE_SOUND from "../../../../protocol/messages/clients/C_CHANGE_SOUND";

const selectedData = ['EN', 'UA']

const Settings = (props) =>{


    const [language, setLanguage] = useState('EN')
    const [mute, setMute] = useState(false)
    const dispatch = useDispatch()
    const { logout } = useContext(UserContext);

    const Logout = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
        new C_LEAVE_SOCKET()
        logout()
    }

    const useSelectCheckBox = (data) =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        if(props.user.language !== data){
            setLanguage(data)
            new C_CHANGE_LANGUAGE(data)
        }
    }

    const setMuteUnmute = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        new C_CHANGE_SOUND(!mute)
        setMute(!mute)
    }

    const openTutorial = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
        delay(300).then(()=>{
            dispatch(setTutorialPopup({visible: true, data: null}))
        })
    }

    const openNews = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
        delay(300).then(()=>{
            transitionState('NewsScreen')
        })
    }

    const setSupport = async () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        Linking.openURL(
            `mailto:maksdev01panel@gmail.com?subject=Knocky dice help request&body=I have a question, nick: ${props.user.username}`
        ).catch(err=>{
            console.log('link error', err)
        })
    }

    const deleteAccount = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSettingsMenuPopup({visible: false, data: null}))
        setTimeout(()=>{dispatch(setDeleteAccountPopup({visible: true, data: null}))}, 500)
    }

    useEffect(()=>{
        if(props.user && props.user.language){
            setLanguage(props.user.language)
        }

        if(props.sounds && props.sounds){
            setMute(props.sounds)
        }
    },[])

    return (
        <SettingsContainer>
            <ContentContainer>
                <Btn onPress={props.closeModal} activeOpacity={0.9}>
                    <ReturnContainer  style={{ borderBottomWidth: 3 }}>
                        <Img source={goBack} resizeMode='stretch'/>
                        <Text  large blod center numberOfLines={1} color={'#0c6fb6'}>{props.back}</Text>
                    </ReturnContainer>
                </Btn>
                <Btn onPress={openNews} activeOpacity={0.9}>
                    <TutorialContainer  style={{ borderBottomWidth: 3 }}>
                        <Img source={news} resizeMode='contain'/>
                        <Text large blod center numberOfLines={1} color={'#0c6fb6'}>News</Text>
                    </TutorialContainer>
                </Btn>
                <Btn onPress={openTutorial} activeOpacity={0.9}>
                    <TutorialContainer  style={{ borderBottomWidth: 3 }}>
                        <Img source={tutorial} resizeMode='contain'/>
                        <Text large blod center numberOfLines={1} color={'#0c6fb6'}>Tutorial</Text>
                    </TutorialContainer>
                </Btn>
                <Btn onPress={()=>{}} activeOpacity={1}>
                    <LanguageContainer  style={{ borderBottomWidth: 3 }}>
                        <ImgSelect source={lang} resizeMode='stretch'/>
                        <SelectDropdown
                            data={selectedData}
                            onSelect={useSelectCheckBox}
                            defaultButtonText={language}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            statusBarTranslucent={true}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle(props)}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle(props)}
                        />
                    </LanguageContainer>
                </Btn>
                <Btn onPress={setMuteUnmute} activeOpacity={0.9}>
                    <SoundsContainer  style={{ borderBottomWidth: 3 }}>
                        <Img source={mute ? unmuteSounds : muteSounds} resizeMode='stretch'/>
                        <Text large blod center numberOfLines={1} color={'#0c6fb6'}>{props.muteUnmute}</Text>
                    </SoundsContainer>
                </Btn>
                <Btn onPress={setSupport} activeOpacity={0.9}>
                    <SupportContainer style={{ borderBottomWidth: 3 }}>
                        <Img source={support} resizeMode='stretch'/>
                        <Text large blod center numberOfLines={1} color={'#0c6fb6'}>{props.support}</Text>
                    </SupportContainer>
                </Btn>
                <Btn onPress={deleteAccount} activeOpacity={0.9}>
                    <DeleteAccContainer style={{ borderBottomWidth: 3 }}>
                        <Img source={deleteAcc} resizeMode='stretch'/>
                        <Text large blod center numberOfLines={1} color={'#0c6fb6'}>{props.deleteAccount}</Text>
                    </DeleteAccContainer>
                </Btn>
                <Btn onPress={Logout} activeOpacity={0.9}>
                    <LeaveContainer style={{ borderBottomWidth: 3 }}>
                        <Img source={exit} resizeMode='stretch'/>
                        <Text large blod center numberOfLines={1} color={'#0c6fb6'}>{props.leaveGame}</Text>
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

const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 85%;
  background-color: rgba(17, 192, 113, 0.59);
  border: 1px solid rgb(255, 157, 77);
  margin: 5px;
  border-radius: 10px;
  padding: 5px 20px;
`

const ReturnContainer = styled(BtnContainer)`
  background-color: rgb(255, 157, 77);
  border: 1px solid rgba(0, 0, 0, 0.59);
`
const SoundsContainer = styled(BtnContainer)``
const LeaveContainer = styled(BtnContainer)`
  border: 1px solid rgb(2, 2, 2);
`
const DeleteAccContainer = styled(BtnContainer)`
  background-color: rgb(241, 92, 79);
  border: 1px solid rgb(2, 2, 2);
`
const TutorialContainer = styled(BtnContainer)``
const SupportContainer = styled(BtnContainer)``
const LanguageContainer = styled(BtnContainer)``

const Info = styled.View`
  width: 70%;
`

const Btn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  width: 100%;
`

const Img = styled.Image`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`

const ImgSelect = styled.Image`
    width: 30px;
    height: 30px;
`

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        height: 30,
        backgroundColor: 'rgba(255,255,255,0)',
    },
    dropdown1BtnTxtStyle: (props)=> {
        return {
            color: '#0c6fb6',
            textAlign: 'left',
            fontFamily: props.user && props.user.language !== 'EN' ? 'Gogono-Cocoa' : 'Dilo-World'
        }
    },
    dropdown1DropdownStyle: {
        backgroundColor: 'rgba(239,239,239,0)'
    },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5'
    },
    dropdown1RowTxtStyle: (props)=> {
        return {
            color: '#0c6fb6',
            textAlign: 'center',
            fontFamily: props.user && props.user.language !== 'EN' ? 'Gogono-Cocoa' : 'Dilo-World'
        }
    },
});

const mapStateToProps = (state) => ({
    user: selectMyUser(state),
    back: selectTranslation(state,defaultTranslation.TR_RETURN_TO_GAME),
    support: selectTranslation(state,defaultTranslation.TR_SUPPORT),
    muteUnmute: selectTranslation(state,defaultTranslation.TR_MUTE_UNMUTE),
    leaveGame: selectTranslation(state,defaultTranslation.TR_LEAVE_GAME),
    deleteAccount: selectTranslation(state,defaultTranslation.TR_DELETE_ACCOUNT),
    sounds: selectSoundsInfo(state),
})

export default connect(mapStateToProps)(Settings);