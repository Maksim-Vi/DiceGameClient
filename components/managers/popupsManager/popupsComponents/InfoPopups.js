import React from 'react';
import styled from "styled-components";
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {useDispatch, useSelector} from "react-redux";
import {selectInfoPopup, setInfoPopup} from "../../../redux/reducers/popups/PopupsReducer";
import Text from "../../../common/Text/Text";
import ButtonWithText from "../../../common/Buttons/ButtonWithText";

const InfoPopups = () => {

    const dispatch = useDispatch()
    const info = useSelector(state=> selectInfoPopup(state))

    const closePopup = () =>{
        dispatch(setInfoPopup({visible: false, data: null}))
    }

    return (
        <ModalWrapper modalBG={'default'} modalVisible={true}>
            <InfoContainer>
                <TextContainer>
                    <Text large blod center color={'#fefefe'}>{info.data.text || 'coming soon'}</Text>
                </TextContainer>
                <ButtonWithText  width={'80%'}
                                 height={'40px'}
                                 text={'close'}
                                 clickHandler={closePopup}/>
            </InfoContainer>
        </ModalWrapper>
    );
};

const InfoContainer = styled.View`
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
  height: 70%;
`

export default InfoPopups;