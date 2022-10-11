import React from 'react';
import gameIcon from "../../../../assets/dice/play_dice.png";
import styled from "styled-components";
import Text from "../../../common/Text/Text";
import { useWindowDimensions } from 'react-native';

const GameWithOpponentByTime = (props) => {


  const {width,height} = useWindowDimensions()

  const hendelClick = () =>{
      alert('coming soon')
      //props.hendlerPlayGame(3)
  }

  return (
      <OpponentContainer width={width} height={height} onPress={hendelClick} style={{ borderBottomWidth: 8 }}>
        <TextCont small heavy color={'#ff9d4d'} center>tap to play</TextCont>
        <GameImage source={gameIcon} resizeMode={ 'stretch'}/>
        <TextCont madium heavy color={'#ff9d4d'} center>Fight&Opp. by time</TextCont>
      </OpponentContainer>
  );
};

const OpponentContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props=> `${props.width ? (props.width / 3) - 10 : 130}px`};
  height: 180px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
  opacity: 0.6;
`
const GameImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px auto;
`
const TextCont = styled(Text)`
  width: 80px;
  font-family: 'Dilo-World';
  text-shadow: 1px 1px 1px #000;
`

export default GameWithOpponentByTime;