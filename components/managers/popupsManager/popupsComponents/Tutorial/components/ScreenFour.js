import React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import Text from "../../../../../common/Text/Text";
import dicy from "../../../../../../assets/tutorial/dicy_2.png";
import board1 from "../../../../../../assets/tutorial/collect-2.png";
import board2 from "../../../../../../assets/tutorial/collect-3.png";
import {selectTranslation} from "../../../../../redux/reducers/language/LanguageReducer";

const ScreenFour = (props) => {
    return <ScreenFirstContainer>
        <Container>
            <Text setShadow large blod center>{props.text8}</Text>
            <FirstTextContainer>
                <Text setShadow madium blod center>{props.text9}</Text>
                <Board1 source={board1} resizeMode={'contain'}/>
            </FirstTextContainer>
            <Dicy source={dicy} resizeMode={'contain'}/>
            <SecondTextContainer>
                <Board2 source={board2} resizeMode={'contain'}/>
                <Text setShadow madium blod center>{props.text10}</Text>
            </SecondTextContainer>
            <Text setShadow large blod center>{props.text11}</Text>
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
  height: 80%;
`
const FirstTextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 50%;
  margin-right: -20%;
`

const SecondTextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 50%;
  margin-left: -20%;
`
const Board1 = styled.Image`
  width: 200px;
  height: 200px;
`
const Board2 = styled.Image`
  width: 150px;
  height: 150px;
`

const Dicy = styled.Image`
  position: absolute;
  top: 22%;
  width: 220px;
  height: 220px;
  margin-left: -50px;
`
const mapStateToProps = (state) => ({
    text8: selectTranslation(state,'TR_TUTORIAL_TEXT_8'),
    text9: selectTranslation(state,'TR_TUTORIAL_TEXT_9'),
    text10: selectTranslation(state,'TR_TUTORIAL_TEXT_10'),
    text11: selectTranslation(state,'TR_TUTORIAL_TEXT_11'),
})

export default connect(mapStateToProps)(ScreenFour);