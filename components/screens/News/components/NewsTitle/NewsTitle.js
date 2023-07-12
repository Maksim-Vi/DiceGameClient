import React from 'react';
import bgTitle from "../../../../../assets/bg/title_info_text_BG.png";
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import {useWindowDimensions} from "react-native";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {connect} from "react-redux";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const NewsTitle = (props) => {
    const {width,height} = useWindowDimensions()

    return (
        <Title width={width}>
            <TitleBG source={bgTitle} resizeMode={'stretch'}>
                <Text setShadow={true} large blod center>{props.news}</Text>
            </TitleBG>
        </Title>
    )
}

const Title = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 50px;
  margin-top: 20%;
`

const TitleBG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const mapStateToProps = (state) => ({
    news: selectTranslation(state,defaultTranslation.TR_NEWS),
})

export default connect(mapStateToProps)(NewsTitle);