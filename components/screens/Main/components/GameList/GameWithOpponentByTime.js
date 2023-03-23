import React from 'react';
import gameIcon from "../../../../../assets/dice/vs_time2.png";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import {store} from "../../../../redux/redux-store";
import {setInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bgGame from "../../../../../assets/common/btns/GameBtnBlue.png";

const GameWithOpponentByTime = (props) => {

  const handelClick = () =>{
      Sounds.loadAndPlayFile(soundsType.click2)
      store.dispatch(setInfoPopup({visible: true, data: {text: 'Coming Soon =)'}}))
      //new C_QUICK_PLAY(3)
  }

  return (
      <BG source={bgGame} resizeMode={'contain'}>
          <OpponentContainer onPress={handelClick}
                             activeOpacity={0.9}
                             //style={{ borderBottomWidth: 8 }}
          >
            <TextCont setShadow={true} madium blod color={'#ff9d4d'} center>{props.tap_to_play}</TextCont>
            <GameImage source={gameIcon} resizeMode={'contain'}/>
            <TextCont numberOfLines={2} setShadow={true} fontSize={16} blod color={'#ff9d4d'} center>{props.fightOppByTime}</TextCont>
          </OpponentContainer>
      </BG>
  );
};

const BG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  opacity: 0.6;
`

const OpponentContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 90%;
  border-radius: 20px;
  margin-top: 15px;
  padding: 0 30px;
`
const GameImage = styled.Image`
  width: 130px;
  height: 130px;
  margin: 10px 20px;
`
const TextCont = styled(Text)`
  text-shadow: 1px 1px 1px #000;
`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state,defaultTranslation.TR_TAP_TO_PLAY),
    fightOppByTime: selectTranslation(state,defaultTranslation.TR_FIGHT_OPP_BY_TIME),
})

export default connect(mapStateToProps)(GameWithOpponentByTime);