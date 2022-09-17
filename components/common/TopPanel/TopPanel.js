import React from 'react'
import styled from 'styled-components'
import {connect} from "react-redux";
import {
    selectMyUser,
    selectUserCoins,
    selectUserCrystals,
    selectUserExperience, selectUserFlash
} from "../../redux/reducers/players/PlayersReducer";
import Coins from "./components/Top/Coins";
import Crystals from "./components/Top/Crystals";
import {NativeModules, Platform} from "react-native";
import Flash from "./components/Top/Flash";
import TopPanelBottom from "./TopPanelBottom";

const TopMain = (props) => {

    const [userData, setUserData] = React.useState({
        user: null,
        coins: 0,
        crystals: 0,
        flash: 0,
        experience: null,
        avatarId: null
    })

    React.useEffect(()=>{
        if(props.user){
            setUserData({
                user: props.user,
                coins: props.user.coins,
                crystals: props.user.crystals,
                experience: props.user.experience,
                flash: props.user.flash,
                avatarId: null
            })
        }
    },[props.user])

    return (
        <React.Fragment>
            <TopPanel>
                <TopPanelContainer>
                    <ElementsContainer>
                        <Coins coins={userData.coins}/>
                        <Crystals crystals={userData.crystals}/>
                        <Flash crystals={userData.flash}/>
                    </ElementsContainer>
                </TopPanelContainer>
                <ProgressContainer>
                    <Progress progress={userData.experience ? userData.experience.progress : 0}/>
                </ProgressContainer>
            </TopPanel>

            <TopPanelBottom userData={userData}/>
        </React.Fragment>

    )
}

const TopPanel = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${()=>{
    if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
      return `
        margin-top: 35px;
      `
    }
  }}
`
const TopPanelContainer = styled.View`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: rgb(1,1,70);
    width: 100%;
     ${()=>{
        if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
           return `
           width: 99%;
            border-radius: 15px;
           `
        }
    }}
`
const ElementsContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
`
const ProgressContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: rgb(1,1,70);
  height: 0.1px;
  ${()=>{
    if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
      return `
         width: 90%;
         border-radius: 5px;
      `
    } else {
      return 'width: 100%;'
    }
  }}
`
const Progress = styled.View`
    display: flex;
    width: 100%;
    height: 4px;
    background-color: rgb(255,157,77);
    border-radius: 5px;
    ${props=>{
      if(props.progress){
          return `width: ${props.progress}%`;
      } else {
          return `width: 0%`;
      }
    }}
`
const LogoutBtn = styled.TouchableOpacity`
    align-self: flex-end;
    background-color: rgb(255,157,77);
    border-radius: 10px;
    border: 1px solid #000;
    padding: 2px 10px;
`
const mapStateToProps = (state) => ({
    user: selectMyUser(state),
    coins: selectUserCoins(state),
    crystals: selectUserCrystals(state),
    experience: selectUserExperience(state),
    flash: selectUserFlash(state),
})

export default connect(mapStateToProps)(TopMain);