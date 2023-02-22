import React from 'react';
import gameIcon from "../../../../../assets/dice/vs_person1.png";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import C_QUICK_PLAY from "../../../../protocol/messages/clients/games/C_QUICK_PLAY";
import bgGame from "../../../../../assets/common/btns/GameBtnBlue.png";

const GameWithOpponent = (props) => {

  const handelClick = () =>{
      Sounds.loadAndPlayFile(soundsType.click2)
      new C_QUICK_PLAY(2)
  }

  return (
      <BG source={bgGame} resizeMode={'contain'}>
          <OpponentContainer onPress={handelClick}
                             activeOpacity={0.9}
                            //style={{ borderBottomWidth: 8 }}
          >
            <TextCont numberOfLines={1} setShadow={true} madium heavy color={'#ff9d4d'} center>{props.tap_to_play}</TextCont>
            <GameImage source={gameIcon} resizeMode={'contain'}/>
            <TextCont numberOfLines={2} setShadow={true} fontSize={16} heavy color={'#ff9d4d'} center>{props.fightOpp}</TextCont>
          </OpponentContainer>
      </BG>
  );
};

const BG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`

const OpponentContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  margin-top: 20px;
  padding: 0 50px;
`
const GameImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 15px auto;
`
const TextCont = styled(Text)`

`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state,defaultTranslation.TR_TAP_TO_PLAY),
    fightOpp: selectTranslation(state,defaultTranslation.TR_FIGHT_OPP),
})

export default connect(mapStateToProps)(GameWithOpponent);