import React from 'react';
import gameIcon from "../../../../assets/dice/icons8-dices-98.png";
import styled from "styled-components";
import Text from "../../../common/Text/Text";
import { useWindowDimensions } from 'react-native';
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import Sounds, {soundsType} from "../../../utils/Sounds";

const GameWithOpponent = (props) => {

  const {width,height} = useWindowDimensions()

  const handelClick = () =>{
      Sounds.loadAndPlayFile(soundsType.click2)
      props.handlerPlayGame(2)
  }

  return (
      <OpponentContainer width={width} height={height} onPress={handelClick} style={{ borderBottomWidth: 8 }}>
        <TextCont numberOfLines={1} setShadow={true} small heavy color={'#ff9d4d'} center>{props.tap_to_play}</TextCont>
        <GameImage source={gameIcon} resizeMode={ 'stretch'}/>
        <TextCont numberOfLines={1} setShadow={true} madium heavy color={'#ff9d4d'} center>{props.fightOpp}</TextCont>
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
`
const GameImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px auto;
`
const TextCont = styled(Text)`
`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state,defaultTranslation.TR_TAP_TO_PLAY),
    fightOpp: selectTranslation(state,defaultTranslation.TR_FIGHT_OPP),
})

export default connect(mapStateToProps)(GameWithOpponent);