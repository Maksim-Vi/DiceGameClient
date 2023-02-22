import React from 'react';
import gameIcon from "../../../../../assets/dice/bot2.png";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {connect, useDispatch} from "react-redux";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bgGame from "../../../../../assets/common/btns/GameBtnBlue.png";
import {setBotGameTypesPopup} from "../../../../redux/reducers/popups/PopupsReducer";

const GameWithBot = (props) => {

    const dispatch = useDispatch()

    const handelClick = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setBotGameTypesPopup({visible: true, data: null}))
    }

    return (
        <BG source={bgGame} resizeMode={'contain'}>
            <BotContainer onPress={handelClick}
                          activeOpacity={0.9}>
                <TextCont numberOfLines={1} setShadow={true} madium heavy color={'#ff9d4d'}
                          center>{props.tap_to_play}</TextCont>
                <GameImage source={gameIcon} resizeMode={'contain'}/>
                <TextCont numberOfLines={1} setShadow={true} fontSize={18} heavy color={'#ff9d4d'}
                          center>{props.fightBot}</TextCont>
            </BotContainer>
        </BG>
    );
};

const BG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const BotContainer = styled.TouchableOpacity`
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
  width: 80px;
  height: 80px;
  margin: 30px auto;
`

const TextCont = styled(Text)`
  text-shadow: 1px 1px 1px #000;
`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state, defaultTranslation.TR_TAP_TO_PLAY),
    fightBot: selectTranslation(state, defaultTranslation.TR_FIGHT_BOT),
})

export default connect(mapStateToProps)(GameWithBot);