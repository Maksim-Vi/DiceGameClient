import React from 'react';
import styled from "styled-components";
import mainBg from "../../../assets/bg/main_bg.jpg";
import BackgroundWrapper from "../../common/BackgroundWrapper/BackgroundWrapper";
import ButtonBack from "../../common/Buttons/Back/ButtonBack";

const FriendsScreen = (props) => {
    return (
        <BackgroundWrapper gackground={mainBg}>
            <ButtonBack goMainPage={true}/>

        </BackgroundWrapper>
    )
}

const FriendsContainer = styled.View`

`

export default FriendsScreen;