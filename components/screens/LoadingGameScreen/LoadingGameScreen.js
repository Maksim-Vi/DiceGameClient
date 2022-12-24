import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import styled from 'styled-components';
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import UserFrame from "./components/UserFrame";
import OpponentFrame from "./components/OpponentFrame";
import {selectCurrentGameId} from "../../redux/reducers/game/GameReducer";
import {store} from "../../redux/redux-store";
import C_ABORDED_GAME from "../../protocol/messages/clients/games/C_ABORDED_GAME";

const LoadingGameScreen = () => {

	const leaveGame = () =>{
		const leaveGameId = selectCurrentGameId(store.getState())
		new C_ABORDED_GAME(leaveGameId)
	}

	return (
		<BackgroundWrapper gackground={mainBg}>    
			<ButtonBack leaveGame={leaveGame} goMainPage={true}/>
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
