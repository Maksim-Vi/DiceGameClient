import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {selectActiveMissionId, selectRoadMissions} from "../../../../redux/reducers/road/RoadReducer";
import {connect} from "react-redux";
import ProgressBar from "./ProgressBar";
import Info from "./Info";
import RoadTimer from "./RoadTimer";
import {Animated, Easing, NativeModules, Platform} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";
import {getIosModel} from "../../../../utils/utils";

const RoadInfoMission = (props) => {

    const show = React.useRef(new Animated.Value(0))
    const [infoState, setInfoState] = useState({
        activeMission: null
    })

    const showPlaceAnim = () => {
        Animated.sequence([
            Animated.delay(500),
            setTimingAnimated(show.current, 1.05, 800, Easing.cubic,true),
            setTimingAnimated(show.current, 1, 600, Easing.cubic,true),
        ]).start();

    }

    useEffect(() => {
        if (props.roadMissions && props.activeMissionId) {
            const activeMission = props.roadMissions.find(mission => mission.id === props.activeMissionId)
            setInfoState({...infoState, activeMission: activeMission})
            showPlaceAnim()
        }
    }, [props.activeMissionId])

    if (!infoState.activeMission || !props.activeMissionId) return

    return (
        <RoadInfoContainer style={{
            opacity: show.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [
                {
                    scale: show.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            ]
        }}
        >
            <Info activeMission={infoState.activeMission}/>
            <BottomContainer>
                <ProgressBar activeMission={infoState.activeMission}/>
                <RoadTimer activeMission={infoState.activeMission}/>
            </BottomContainer>
        </RoadInfoContainer>
    )
}

const RoadInfoContainer = styled(Animated.View)`
  position: absolute;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${()=>{
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
      return `
        width: 70%;
        top: 6%;
      `
    } else {
      return `
        width: 70%;
        top: 1%;
      `
    }
  }}
  height: 70px;
  background-color: rgb(225, 182, 139);
  border: 1px solid rgb(114, 69, 13);
  border-radius: 10px;
`

const BottomContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  height: 50%;
  border-radius: 10px;
  background-color: rgba(169, 126, 84, 0.86);
`

const mapStateToProps = (state) => ({
    roadMissions: selectRoadMissions(state),
    activeMissionId: selectActiveMissionId(state),
})

export default connect(mapStateToProps)(RoadInfoMission);