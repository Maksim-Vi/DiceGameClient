import React from 'react'
import styled from 'styled-components'

import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import dynamicLoadImage from "../../../assets/dynamicLoadImage";

const BackgroundWrapper = (props) => {

    const bg = dynamicLoadImage.bg[props.TR_BG_TYPE] || dynamicLoadImage.bg.main_bg

    return (
        <ContainerApp>
            <Background source={props.gackground ? props.gackground : bg} resizeMode="cover">
                {props.children}
            </Background>
        </ContainerApp>
    )
}

const ContainerApp = styled.View`
  flex: 1;
`
const Background = styled.ImageBackground`
  flex: 1;
`
const mapStateToProps = (state) => ({
    TR_BG_TYPE: selectTranslation(state, defaultTranslation.TR_BG_TYPE),
});

export default connect(mapStateToProps)(BackgroundWrapper);