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
    selectUserExperience
} from "../../redux/reducers/players/PlayersReducer";
import Experience from "./components/Experience";
import Coins from "./components/Coins";
import Crystals from "./components/Crystals";
import {NativeModules, Platform} from "react-native";

const TopMain = (props) => {

    const [userData, setUserData] = React.useState({
        coins: 0,
        crystals: 0,
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
                experience: props.user.experience
            })
        }
    },[props.user])

    return (
        <TopPanelContainer>
            <ElementsContainer>
                <Experience experience={userData.experience}/>
                <Coins coins={userData.coins}/>
                <Crystals crystals={userData.crystals}/>
                <LogoutBtn onPress={Logout}><Text>Logout</Text></LogoutBtn>
            </ElementsContainer>
        </TopPanelContainer>
    )
}

const TopPanelContainer = styled.View`
    height: 50px;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: rgb(1,1,70);
    ${()=>{
        if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
           return 'margin-top: 35px;'
        }
    }}
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
})

export default connect(mapStateToProps)(TopMain);