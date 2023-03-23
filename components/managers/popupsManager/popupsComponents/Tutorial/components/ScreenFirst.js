import React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import Text from "../../../../../common/Text/Text";
import dicy from "../../../../../../assets/tutorial/dicy.png";
import {selectTranslation} from "../../../../../redux/reducers/language/LanguageReducer";

const ScreenFirst = (props) => {
    return <ScreenFirstContainer>
        <Container>
            <Text setShadow title blod center>{props.text1}</Text>
            <Text setShadow large blod center>{props.text2}</Text>
            <Dicy source={dicy} resizeMode={'contain'}/>
        </Container>
    </ScreenFirstContainer>
}

const ScreenFirstContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 70%;
`
const Dicy = styled.Image`
  width: 250px;
  height: 250px;
  margin-left: -50px;
`
const mapStateToProps = (state) => ({
    text1: selectTranslation(state,'TR_TUTORIAL_TEXT_1'),
    text2: selectTranslation(state,'TR_TUTORIAL_TEXT_2')
})

export default connect(mapStateToProps)(ScreenFirst);