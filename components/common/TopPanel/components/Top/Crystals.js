import React from "react";
import Text from "../../../Text/Text";
import styled from "styled-components";
import star from "../../../../../assets/topPanel/diamond.png";
import {store} from "../../../../redux/redux-store";
import {setDiamondsInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";

const Crystals = (props) => {

    const openInfoCrystals = () => {
        store.dispatch(setDiamondsInfoPopup({visible: true, data: null}))
    }

    return (
        <ButtonClick onPress={openInfoCrystals} accessible={false}>
            <CrystalsContainer {...props}>
                <CrystalsImage source={star} resizeMode="cover"/>
                <Text setShadow={true} blod medium center>{props.crystals}</Text>
            </CrystalsContainer>
        </ButtonClick>
    )
}

const ButtonClick = styled.TouchableWithoutFeedback`

`

const CrystalsContainer = styled.View`
  position: relative;
  border: 2px solid rgb(255, 157, 77);
  border-radius: 5px;
  background-color: #00eaff;
  padding: 2px 20px 2px 20px;

  ${(props) => {
    if (props.width) {
      return `
        width: ${props.width}px;
      `
    }
  }}
`

const CrystalsImage = styled.Image`
  position: absolute;
  top: -5px;
  left: -15px;
  width: 30px;
  height: 30px;
`

export default Crystals