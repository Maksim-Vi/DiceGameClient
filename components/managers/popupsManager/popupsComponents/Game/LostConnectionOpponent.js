import React from 'react';
import styled from "styled-components";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {useDispatch, useSelector} from "react-redux";
import {selectInfoPopup, setLostConnOppPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import Text from "../../../../common/Text/Text";
import ButtonWithText from "../../../../common/Buttons/ButtonWithText";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";
import {useWindowDimensions} from "react-native";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import C_USER_BREAK_GAME from "../../../../protocol/messages/clients/games/C_USER_BREAK_GAME";

const LostConnectionOpponent = () => {

    const {height} = useWindowDimensions()
    const dispatch = useDispatch()
    const info = useSelector(state=> selectInfoPopup(state))
    const TR_LOST_USER_CONNECTION_GAME = useSelector(state=> selectTranslation(state, defaultTranslation.TR_LOST_USER_CONNECTION_GAME))
    const TR_WAIT = useSelector(state=> selectTranslation(state, defaultTranslation.TR_WAIT))
    const TR_LEFT_GAME = useSelector(state=> selectTranslation(state, defaultTranslation.TR_LEFT_GAME))


    const leftGamePopup = () =>{
        new C_USER_BREAK_GAME()
        dispatch(setLostConnOppPopup({visible: false, data: null}))
    }

    const closePopup = () =>{
        dispatch(setLostConnOppPopup({visible: false, data: null}))
    }

    return (
        <ModalWrapper modalBG={'default'} height={height / 2} modalVisible={true}>
            <LoastConnectionOpponentGameContainer>
                <TextContainer>
                    <Text setShadow={true} large blod center color={'#fefefe'}>{TR_LOST_USER_CONNECTION_GAME}</Text>
                </TextContainer>

                <ButtonContainer>
                    <ButtonWithText  width={'45%'}
                                     height={'40px'}
                                     text={TR_WAIT}
                                     clickHandler={closePopup}/>
                    <ButtonWithText  width={'45%'}
                                     height={'40px'}
                                     color={'#c53838'}
                                     text={TR_LEFT_GAME}
                                     clickHandler={leftGamePopup}/>
                </ButtonContainer>

            </LoastConnectionOpponentGameContainer>
        </ModalWrapper>
    );
};

const LoastConnectionOpponentGameContainer = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  width: 100%;
  height: 100%;
`
const TextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(145, 93, 82, 0.8);
  border-radius: 20px;
  width: 100%;
  height: 60%;
  padding: 20px;
`
const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
`

export default LostConnectionOpponent;