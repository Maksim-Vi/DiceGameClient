import React from 'react';
import styled from "styled-components";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {useDispatch, useSelector} from "react-redux";
import {setDiamondsInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import Text from "../../../../common/Text/Text";
import ButtonWithText from "../../../../common/Buttons/ButtonWithText";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";
import {useWindowDimensions} from "react-native";
import {selectDefaultParams, selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {transitionState} from "../../../../utils/utils";
import defaultParams from "../../../../redux/reducers/language/defaultParams";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const DiamondInfoPopups = () => {

    const {width, height} = useWindowDimensions()
    const ENABLE_COLLECTIONS = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_COLLECTIONS))
    const diamonds = useSelector(state=> selectTranslation(state, defaultTranslation.TR_DIAMONDS_INFO_TITLE))
    const diamondsInfo = useSelector(state=> selectTranslation(state, defaultTranslation.TR_DIAMONDS_INFO))

    const dispatch = useDispatch()

    const openCollection = () =>{
        if(ENABLE_COLLECTIONS){
            transitionState('CollectionsScreen')
        }

        closePopup()
    }

    const closePopup = () =>{
        dispatch(setDiamondsInfoPopup({visible: false, data: null}))
    }

    return (
        <ModalWrapper modalBG={'default'} width={width - 35} height={height / 3} modalVisible={true} setModalVisible={closePopup}>
            <TextTitle title blod center color={'#fefefe'}>{diamonds}</TextTitle>
            <InfoContainer>
                <TextContainer style={{borderBottomWidth: 3}}>
                    <Text setShadow={true} large blod center color={'#fefefe'}>{diamondsInfo}</Text>
                </TextContainer>
                <ButtonWithText  width={'80%'}
                                 height={'40px'}
                                 text={'Open Collections'}
                                 clickHandler={openCollection}/>
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

export default DiamondInfoPopups;