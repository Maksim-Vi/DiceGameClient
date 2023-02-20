import React from 'react';
import gameIcon from "../../../../../assets/dice/bot2.png";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {connect} from "react-redux";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import C_QUICK_PLAY from "../../../../protocol/messages/clients/games/C_QUICK_PLAY";

const GameWithBot = (props) => {

  const handelClick = () =>{
      Sounds.loadAndPlayFile(soundsType.click2)
      new C_QUICK_PLAY(1)
  }

  return (
      <BotContainer onPress={handelClick} style={{ borderBottomWidth: 8 }}>
        <TextCont numberOfLines={1} setShadow={true} madium heavy color={'#ff9d4d'} center>{props.tap_to_play}</TextCont>
        <GameImage source={gameIcon} resizeMode={'contain'}/>
        <TextCont numberOfLines={1} setShadow={true} title heavy color={'#ff9d4d'} center>{props.fightBot}</TextCont>
      </BotContainer>
  );
};

const BotContainer = styled.TouchableOpacity`
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
  width: 120px;
  height: 120px;
  margin: 15px auto;
`
const TextCont = styled(Text)`
  text-shadow: 1px 1px 1px #000;
`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state,defaultTranslation.TR_TAP_TO_PLAY),
    fightBot: selectTranslation(state,defaultTranslation.TR_FIGHT_BOT),
})

export default connect(mapStateToProps)(GameWithBot);