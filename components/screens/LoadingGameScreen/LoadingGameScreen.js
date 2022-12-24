import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import styled from 'styled-components';
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import UserFrame from "./components/UserFrame";
import OpponentFrame from "./components/OpponentFrame";

const LoadingGameScreen = () => {
	return (
		<BackgroundWrapper gackground={mainBg}>    
			<ButtonBack />
			<LoadingContainer>
				<OpponentFrame />
				<UserFrame />
			</LoadingContainer>
		</BackgroundWrapper>
	)
	
}
    
const LoadingContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-around;
	margin: 200px;
`
    
export default LoadingGameScreen
