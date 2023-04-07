import React from 'react';
import styled from "styled-components";
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {useDispatch, useSelector} from "react-redux";
import {selectInfoPopup, setInfoPopup} from "../../../redux/reducers/popups/PopupsReducer";
import Text from "../../../common/Text/Text";
import ButtonWithText from "../../../common/Buttons/ButtonWithText";
import TextWithoutShadow from "../../../common/Text/TextWithoutShadow";
import {useWindowDimensions} from "react-native";
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";

const InfoPopups = () => {

    const {width, height} = useWindowDimensions()
    const dispatch = useDispatch()
    const info = useSelector(state=> selectInfoPopup(state))
    const close = useSelector(state=> selectTranslation(state, defaultTranslation.TR_CLOSE))

    const closePopup = () =>{
        dispatch(setInfoPopup({visible: false, data: null}))
    }

    return (
        <ModalWrapper modalBG={'default'} width={width - 35} height={height / 3} modalVisible={true}>
            {info.data.title && <TextTitle title blod center color={'#fefefe'}>{info.data.title}</TextTitle>}
            <InfoContainer>
                <TextContainer style={{borderBottomWidth: 3}}>
                    <Text setShadow={true} large blod center color={'#fefefe'}>{info.data.text || 'coming soon'}</Text>
                </TextContainer>
                <ButtonWithText  width={'80%'}
                                 height={'40px'}
                                 text={close !== defaultTranslation.TR_CLOSE ? close : 'close'}
                                 clickHandler={closePopup}/>
            </InfoContainer>
        </ModalWrapper>
    );
};

const InfoContainer = styled.View`
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
  border: 1px solid rgba(101, 65, 56, 0.8);
  background-color: rgba(145, 93, 82, 0.8);
  border-radius: 20px;
  width: 100%;
  height: 60%;
  padding: 20px;
`
const TextTitle = styled(TextWithoutShadow)`
  position: absolute;
  top: -40px;
  z-index: 1;
`

export default InfoPopups;