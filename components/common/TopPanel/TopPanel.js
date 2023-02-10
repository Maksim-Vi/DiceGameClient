import React from 'react'
import styled from 'styled-components'
import {connect} from "react-redux";
import {
    selectMyUser,
    selectUserCoins,
    selectUserCrystals,
    selectUserExperience,
    selectUserFlash
} from "../../redux/reducers/players/PlayersReducer";
import TopPanelBottom from "./TopPanelBottom";
import PricesItemsPanel from "./components/TopPanelItems/PricesItemsPanel";
import MenuPanel from "./components/TopPanelItems/MenuPanel";
import FriendsPanel from "./components/TopPanelItems/FriendsPanel";
import {Animated, Easing, NativeModules, Platform} from "react-native";
import {setTimingAnimated} from "../../utils/Animation";
import {getIosModel} from "../../utils/utils";

const TopMain = (props) => {

    const scaleAnim = React.useRef(new Animated.Value(0)).current;

    const [userData, setUserData] = React.useState({
        user: null,
        coins: 0,
        crystals: 0,
        flash: 0,
        experience: null,
        avatarId: null
    })

    React.useEffect(() => {
        Animated.sequence([
            setTimingAnimated(scaleAnim, 1, 500, Easing.ease),
        ]).start();

        return () => {
            scaleAnim.setValue(0)
        }
    }, []);

    React.useEffect(() => {
        if (props.user) {
            setUserData({
                user: props.user,
                coins: props.user.coins,
                crystals: props.user.crystals,
                experience: props.user.experience,
                flash: props.user.flash,
                avatarId: props.user.avatar
            })
        }
    }, [props.user])

    return (
        <Panel>
            <TopPanel style={{
                opacity: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
                transform: [
                    {
                        scale: scaleAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        })
                    }
                ]
            }}>
                <FriendsPanel/>
                <PricesItemsPanel userData={userData}/>
                <MenuPanel/>
            </TopPanel>

            <TopPanelBottom userData={userData}/>
        </Panel>

    )
}

const Panel = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  ${() => {
    const isIos = getIosModel()
    if (isIos >= 10) {
      return `
        margin-top: 50px;
      `
    } else if(isIos < 10){
      return `
        margin-top: 10px;
      `
    }
  }}
`

const TopPanel = styled(Animated.View)`
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