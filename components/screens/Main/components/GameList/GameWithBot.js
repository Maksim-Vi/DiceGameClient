import React from 'react';
import gameIcon from "../../../../../assets/dice/bot2.png";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {connect, useDispatch, useSelector} from "react-redux";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bgGame from "../../../../../assets/common/btns/GameBtnBlue.png";
import {
    setBotGameTypesPopup,
    setNotEnoughFlashPopup
} from "../../../../redux/reducers/popups/PopupsReducer";
import {selectUserFlash} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";

const GameWithBot = (props) => {

    const dispatch = useDispatch()
    const userFlash = useSelector(selectUserFlash)

    const handelClick = () => {
        if(props.currentIndexList !== props.indexComponent &&  props.flatlistRef){
            props.updateCurrentIndex(props.indexComponent);
            return props.flatlistRef.scrollToIndex({ animated: true, index: props.indexComponent, });
        }

        if(props.currentIndexList === props.activeIndex){
            Sounds.loadAndPlayFile(soundsType.click2)
            if(userFlash < 1){
                return store.dispatch(setNotEnoughFlashPopup({visible: true}))
            }
            dispatch(setBotGameTypesPopup({visible: true, data: null}))
        }

    }

    return (
        <BG source={bgGame} resizeMode={'contain'}>
            <BotContainer onPress={handelClick}
                          activeOpacity={0.9}>
                <TapTpPlayContainer>
                    <Text setShadow madium blod color={'#ff9d4d'} center>
                        {props.tap_to_play}
                    </Text>
                </TapTpPlayContainer>

                <GameImage source={gameIcon} resizeMode={'contain'}/>
                <DescContainer>
                    <Text setShadow fontSize={18} blod color={'#ff9d4d'} center>
                        {props.fightBot}
                    </Text>
                </DescContainer>
            </BotContainer>
        </BG>
    );
};

const BG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`

const BotContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 85%;
  border-radius: 20px;
  padding: 10px;
`

const TapTpPlayContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
`
const DescContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
`

const GameImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 20px;
`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state, defaultTranslation.TR_TAP_TO_PLAY),
    fightBot: selectTranslation(state, defaultTranslation.TR_FIGHT_BOT),
})

export default connect(mapStateToProps)(GameWithBot);