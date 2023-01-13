import React from 'react';
import styled from "styled-components";
import BackgroundWrapper from "../../common/BackgroundWrapper/BackgroundWrapper";
import ButtonBack from "../../common/Buttons/Back/ButtonBack";

const FriendsScreen = (props) => {
    return (
        <BackgroundWrapper>
            <ButtonBack goMainPage={true}/>

        </BackgroundWrapper>
    )
}

const FriendsContainer = styled.View`

`

export default FriendsScreen;