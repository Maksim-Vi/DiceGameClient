import React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import Text from "../../../../../common/Text/Text";
import table from "../../../../../../assets/tutorial/collectTable.png";
import {selectTranslation} from "../../../../../redux/reducers/language/LanguageReducer";

const ScreenThird = (props) => {
    return <ScreenFirstContainer>
        <Container>
            <Text setShadow large blod center>{props.text5}</Text>
            <Text setShadow madium blod center>{props.text6}</Text>
            <Text setShadow madium blod center>{props.text7}</Text>
            <Table source={table} resizeMode={'contain'}/>
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
  width: 400px;
  height: 400px;
`
const mapStateToProps = (state) => ({
    text5: selectTranslation(state,'TR_TUTORIAL_TEXT_5'),
    text6: selectTranslation(state,'TR_TUTORIAL_TEXT_6'),
    text7: selectTranslation(state,'TR_TUTORIAL_TEXT_7'),
})

export default connect(mapStateToProps)(ScreenThird);