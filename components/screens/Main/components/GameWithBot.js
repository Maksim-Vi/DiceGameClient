import React from 'react';
import gameIcon from "../../../../assets/dice/game_1V1.png";
import styled from "styled-components";
import Text from "../../../common/Text/Text";
import { useWindowDimensions } from 'react-native';
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import {connect} from "react-redux";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";

const GameWithBot = (props) => {

  const {width,height} = useWindowDimensions()

  const hendelClick = () =>{
      props.hendlerPlayGame(1)
  }

  return (
      <BotContainer width={width} height={height} onPress={hendelClick} style={{ borderBottomWidth: 8 }}>
        <TextCont numberOfLines={1} setShadow={true} small heavy color={'#ff9d4d'} center>{props.tap_to_play}</TextCont>
        <GameImage source={gameIcon} resizeMode={ 'stretch'}/>
        <TextCont numberOfLines={1} setShadow={true} madium heavy color={'#ff9d4d'} center>{props.fightBot}</TextCont>
      </BotContainer>
  );
};

const BotContainer = styled.TouchableOpacity`
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
  width: 90px;
  height: 90px;
  margin: 10px auto;
`
const TextCont = styled(Text)`
  text-shadow: 1px 1px 1px #000;
`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state,defaultTranslation.TR_TAP_TO_PLAY),
    fightBot: selectTranslation(state,defaultTranslation.TR_FIGHT_BOT),
})

export default connect(mapStateToProps)(GameWithBot);