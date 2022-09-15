import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../../utils/UserProvider';
import Text from '../Text/Text'
import C_LEAVE_SOCKET from '../../protocol/messages/clients/C_LEAVE_SOCKET'
import {connect} from "react-redux";
import {
    selectMyUser,
    selectUserCoins,
    selectUserCrystals,
    selectUserExperience, selectUserFlash
} from "../../redux/reducers/players/PlayersReducer";
import Experience from "./components/Experience";
import Coins from "./components/Coins";
import Crystals from "./components/Crystals";
import {NativeModules, Platform} from "react-native";
import Flash from "./components/Flash";

const TopMain = (props) => {

    const [userData, setUserData] = React.useState({
        coins: 0,
        crystals: 0,
        flash: 0,
        experience: null
    })
    const { logout } = useContext(UserContext);

    const Logout = () =>{
        new C_LEAVE_SOCKET()
        logout()
    }

    React.useEffect(()=>{
        if(props.user){
            setUserData({
                coins: props.user.coins,
                crystals: props.user.crystals,
                experience: props.user.experience,
                flash: props.user.flash,
            })
        }
    },[props.user])

    return (
        <TopPanel>
            <TopPanelContainer>
                <ElementsContainer>
                    <Experience experience={userData.experience}/>
                    <Coins coins={userData.coins}/>
                    {/*<Crystals crystals={userData.crystals}/>*/}
                    <Flash crystals={userData.flash}/>
                    <LogoutBtn onPress={Logout}><Text>Logout</Text></LogoutBtn>
                </ElementsContainer>
            </TopPanelContainer>
            <ProgressContainer>
                <Progress progress={userData.experience ? userData.experience.progress : 0}/>
            </ProgressContainer>
        </TopPanel>
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
           return 'border-radius: 20px;'
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
  height: 5px;
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