import React from 'react';
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {useWindowDimensions} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import C_QUICK_PLAY from "../../../../protocol/messages/clients/games/C_QUICK_PLAY";
import {setDifficultGame} from "../../../../redux/reducers/game/GameReducer";
import {setBotGameTypesPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const BotTypeGame = props => {

    const {width, height} = useWindowDimensions()
    const gameTypeText = useSelector(state => selectTranslation(state, defaultTranslation.TR_SELECT_GAME_TYPE))
    const medium = useSelector(state => selectTranslation(state, defaultTranslation.TR_MEDIUM))
    const hard = useSelector(state => selectTranslation(state, defaultTranslation.TR_HARD))
    const dispatch = useDispatch()

    const handlerGame = (type) =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setDifficultGame(type))
        new C_QUICK_PLAY(1)
        close()
    }

    const close = () =>{
        dispatch(setBotGameTypesPopup({visible: false, data: null}))
    }

    return (
        <ModalWrapper modalBG={'default'} width={width - 35} height={height / 3} modalVisible={true} setModalVisible={close}>
            <Container>
                <Text numberOfLines={1} setShadow={true} large heavy color={'#ffffff'} center>{gameTypeText}</Text>
                <BotTypeGameContainer>
                    {/*<LowGame onPress={() => handlerGame('Easy')} activeOpacity={0.9} style={{ borderBottomWidth: 8 }}>*/}
                    {/*    <Text numberOfLines={0} setShadow={true} large heavy color={'#ffffff'} center>Low</Text>*/}
                    {/*</LowGame>*/}
                    <MediumGame onPress={() => handlerGame('Medium')} activeOpacity={0.9} style={{ borderBottomWidth: 8 }}>
                        <Text numberOfLines={0} setShadow={true} large heavy color={'#ffffff'} center>{medium}</Text>
                    </MediumGame>
                    <HardGame onPress={() => handlerGame('Hard')} activeOpacity={0.9} style={{ borderBottomWidth: 8 }}>
                        <Text numberOfLines={0} setShadow={true} large heavy color={'#ffffff'} center>{hard}</Text>
                    </HardGame>
                </BotTypeGameContainer>
            </Container>
        </ModalWrapper>
    );
};

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  width: 100%;
  height: 90%;
`

const BotTypeGameContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  height: 80%;
  border-radius: 20px;
  background-color: rgba(164, 119, 78, 0.49);
  border: 3px solid rgba(108, 73, 32, 0.09);
`

const LowGame = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 1 31%;
  height: 60%;
  border-radius: 20px;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
`
const MediumGame = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 1 31%;
  height: 50%;
  border-radius: 20px;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
`
const HardGame = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 1 31%;
  height: 50%;
  border-radius: 20px;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
`

export default BotTypeGame;