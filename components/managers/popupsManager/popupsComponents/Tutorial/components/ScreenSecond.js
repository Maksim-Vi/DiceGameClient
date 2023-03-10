import React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import Text from "../../../../../common/Text/Text";
import dicy from "../../../../../../assets/tutorial/dicy_1.png";
import table from "../../../../../../assets/tutorial/freeTable.png";
import {selectTranslation} from "../../../../../redux/reducers/language/LanguageReducer";

const ScreenSecond = (props) => {
    return <ScreenFirstContainer>
        <Container>
            <Text setShadow large blod center>{props.text3}</Text>
            <Text setShadow large blod center>{props.text4}</Text>
            <ImgContainer>
                <Dicy source={dicy} resizeMode={'contain'}/>
                <Table source={table} resizeMode={'contain'}/>
            </ImgContainer>
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

const ImgContainer = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
`

const Dicy = styled.Image`
  position: absolute;
  left: 50px;
  bottom: 0;
  width: 150px;
  height: 150px;
  margin-left: -50px;
  z-index: 1;
`

const Table = styled.Image`
  width: 450px;
  height: 450px;
`
const mapStateToProps = (state) => ({
    text3: selectTranslation(state,'TR_TUTORIAL_TEXT_3'),
    text4: selectTranslation(state,'TR_TUTORIAL_TEXT_4')
})

export default connect(mapStateToProps)(ScreenSecond);