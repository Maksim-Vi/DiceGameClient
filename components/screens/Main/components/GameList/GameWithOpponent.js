import React from 'react';
import gameIcon from "../../../../../assets/dice/vs_person1.png";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import C_QUICK_PLAY from "../../../../protocol/messages/clients/games/C_QUICK_PLAY";

const GameWithOpponent = (props) => {

  const handelClick = () =>{
      Sounds.loadAndPlayFile(soundsType.click2)
      new C_QUICK_PLAY(2)
  }

  return (
      <OpponentContainer onPress={handelClick} style={{ borderBottomWidth: 8 }}>
        <TextCont numberOfLines={1} setShadow={true} madium heavy color={'#ff9d4d'} center>{props.tap_to_play}</TextCont>
        <GameImage source={gameIcon} resizeMode={'contain'}/>
        <TextCont numberOfLines={2} setShadow={true} fontSize={20} heavy color={'#ff9d4d'} center>{props.fightOpp}</TextCont>
      </OpponentContainer>
  );
};

const OpponentContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  margin: 10px auto;
  padding: 20px;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
`
const GameImage = styled.Image`
  width: 130px;
  height: 130px;
  margin: 10px auto;
`
const TextCont = styled(Text)`

`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state,defaultTranslation.TR_TAP_TO_PLAY),
    fightOpp: selectTranslation(state,defaultTranslation.TR_FIGHT_OPP),
})

export default connect(mapStateToProps)(GameWithOpponent);