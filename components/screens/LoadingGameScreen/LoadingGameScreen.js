import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components';
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import UserFrame from "./components/UserFrame";
import OpponentFrame from "./components/OpponentFrame";
import {selectCurrentGameId} from "../../redux/reducers/game/GameReducer";
import {store} from "../../redux/redux-store";
import C_ABORDED_GAME from "../../protocol/messages/clients/games/C_ABORDED_GAME";
import Text from "../../common/Text/Text";
import vs from '../../../assets/loadGame/97368-versus-download-hd.png'

const LoadingGameScreen = ({route}) => {

	const leaveGame = () =>{
		const leaveGameId = selectCurrentGameId(store.getState())
		new C_ABORDED_GAME(leaveGameId)
	}
	
	return (
		<BackgroundWrapper>
			{route.params.gameType !== 1 && <ButtonBack leaveGame={leaveGame} goMainPage={true}/>}

			<Container>
				<TitleContainer>
					<Text setShadow={true} large blod center>Searching Game</Text>
				</TitleContainer>
				<LoadingContainer>
					<OpponentFrame />
					<VSImage source={vs} resizeMode={ 'stretch'}/>
					<UserFrame />
				</LoadingContainer>
				<Text setShadow={true} small blod center>play more and win many rewards</Text>
			</Container>

		</BackgroundWrapper>
	)
	
}
    
const Container = styled.View`
    flex: 1;
    align-items: center;
	justify-content: center;
`

const VSImage = styled.Image`
	width: 100px;
	height: 100px;
`

const LoadingContainer = styled.View`
    align-items: center;
    justify-content: space-around;
	height: 60%;
	margin-bottom: 20px;
`

const TitleContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 70%;
	height: 40px;
	background-color: #2281ce;
	border-radius: 20px;
	border: 3px solid #2b4b8d;
`
    
export default LoadingGameScreen
