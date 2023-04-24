import React, {useState} from 'react';
import locked from "../../../../../assets/road/locked.png";
import claimed from "../../../../../assets/road/claimed.png";
import ready from "../../../../../assets/road/ready.png";
import styled from "styled-components";
import C_CLAIM_MISSION from "../../../../protocol/messages/clients/road/C_CLAIM_MISSION";
import AnimatedLottieView from "lottie-react-native";
import coinsAnim from "../../../../../assets/animation/lottieAnim/stars-fly.json";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import FlyingAwayAnim from "../../../../common/AnimationScreens/FlyingAwayAnim";
import star from '../../../../../assets/common/star.png'
import {delay} from "../../../../utils/utils";

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
      onFinishAnim()
    }
  }

  const onFinishAnim = () =>{
    delay(1500).then(()=>{
      setLottie(false)
    })
  }

  return (
      <RoadButtonContainer onPress={clickHandler} activeOpacity={0.9}>
          {getButtonByType()}
          {/*{isAnim && <AnimatedLottieView loop={false} autoPlay source={coinsAnim} style={{position: 'absolute', top: -13, width: 150, height: 150}}/>}*/}
          {isAnim &&
              <FlyingAwayAnim countFlyItems={7}
                              minRadius={10}
                              maxRadius={40}
                              icon={star} />
          }
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