import React, {useState} from 'react';
import locked from "../../../../../assets/road/locked.png";
import claimed from "../../../../../assets/road/claimed.png";
import ready from "../../../../../assets/road/ready.png";
import styled from "styled-components";
import C_CLAIM_MISSION from "../../../../protocol/messages/clients/road/C_CLAIM_MISSION";
import AnimatedLottieView from "lottie-react-native";
import coinsAnim from "../../../../../assets/animation/lottieAnim/stars-fly.json";
import Sounds, {soundsType} from "../../../../utils/Sounds";

const RoadButton = (props) => {

  const {isAvailableExecute,isFinished,isClaimed} = props.mission
  const [isAnim,setLottie] = useState(false)

  const getButtonByType = () =>{
    if(isClaimed)
      return <ClaimedImg source={claimed} resizeMode={ 'stretch'}/>
    if(isFinished && !isClaimed)
      return <ReadyImg source={ready} resizeMode={ 'stretch'}/>
    if(!isAvailableExecute && !isFinished && !isClaimed)
      return <LockedImg style={{opacity: 0.6}} source={locked} resizeMode={ 'stretch'}/>

    return <LockedImg source={locked} resizeMode={ 'stretch'}/>
  }

  const clickHandler = () =>{
    if(isFinished && !isClaimed){
      Sounds.loadAndPlayFile(soundsType.stars)
      new C_CLAIM_MISSION(props.mission.missionNumber)
      setLottie(true)
      setTimeout(()=>{
        setLottie(false)
      },3000)
    }
  }

  return (
      <RoadButtonContainer onPress={clickHandler}
                           activeOpacity={0.9}>
          {getButtonByType()}
        {isAnim && <AnimatedLottieView loop={false} autoPlay source={coinsAnim} style={{position: 'absolute', top: -13, width: 150, height: 150}}/>}
      </RoadButtonContainer>
  )
};

const RoadButtonContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
`
const LockedImg = styled.Image`
    width: 50px;
    height: 50px;
`
const ReadyImg = styled.Image`
    width: 50px;
    height: 50px;
`
const ClaimedImg = styled.Image`
    width: 50px;
    height: 50px;
`

export default RoadButton;