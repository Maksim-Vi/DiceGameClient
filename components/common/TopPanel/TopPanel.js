import React from 'react'
import styled from 'styled-components'
import {connect} from "react-redux";
import {
    selectMyUser,
    selectUserCoins,
    selectUserCrystals,
    selectUserExperience, selectUserFlash
} from "../../redux/reducers/players/PlayersReducer";
import TopPanelBottom from "./TopPanelBottom";
import PricesItemsPanel from "./components/TopPanelItems/PricesItemsPanel";
import MenuPanel from "./components/TopPanelItems/MenuPanel";
import FriendsPanel from "./components/TopPanelItems/FriendsPanel";

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
                avatarId: props.user.avatar
            })
        }
    },[props.user])

    return (
        <Panel>
            <TopPanel>
                <FriendsPanel />
                <PricesItemsPanel userData={userData}/>
                <MenuPanel />
            </TopPanel>

            <TopPanelBottom userData={userData}/>
        </Panel>

    )
}

const Panel = styled.View`
  display: flex;
  align-items: center;
  width: 100%;

`

const TopPanel = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-direction: row;
  width: 98%;
`

const mapStateToProps = (state) => ({
    user: selectMyUser(state),
    coins: selectUserCoins(state),
    crystals: selectUserCrystals(state),
    experience: selectUserExperience(state),
    flash: selectUserFlash(state),
})

export default connect(mapStateToProps)(TopMain);