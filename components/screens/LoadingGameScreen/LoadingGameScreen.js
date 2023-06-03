import React, {useEffect} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components';
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import UserFrame from "./components/UserFrame";
import OpponentFrame from "./components/OpponentFrame";
import {selectCurrentGameId, selectGameJoined} from "../../redux/reducers/game/GameReducer";
import {store} from "../../redux/redux-store";
import C_ABORDED_GAME from "../../protocol/messages/clients/games/C_ABORDED_GAME";
import Text from "../../common/Text/Text";
import vs from '../../../assets/loadGame/97368-versus-download-hd.png'
import {connect, useSelector} from "react-redux";
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import { setActiveTabApp } from '../../redux/reducers/Websocket/WebsocketReducer';
import {transitionState} from "../../utils/utils";

const LoadingGameScreen = ({route, ...props}) => {

	const isGameJoined = useSelector(selectGameJoined)

	const leaveGame = () =>{
		if(!isGameJoined){
			const leaveGameId = selectCurrentGameId(store.getState())
			new C_ABORDED_GAME(leaveGameId)
			transitionState('MainScreen')
		}
	}

	return (
		<BackgroundWrapper>
			{route.params.gameType !== 1 && !isGameJoined && <ButtonBack leaveGame={leaveGame} />}

			<Container>
				<TitleContainer>
					<Text setShadow={true} large blod center>{props.searching}</Text>
				</TitleContainer>
				<LoadingContainer>
					<OpponentFrame />
					<VSImage source={vs} resizeMode={ 'stretch'}/>
					<UserFrame />
				</LoadingContainer>
				<Text setShadow={true} small blod center>{props.searchingDesc}</Text>
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

const mapStateToProps = (state) => ({
	searching: selectTranslation(state, defaultTranslation.TR_SEARCHING_GAME),
	searchingDesc: selectTranslation(state, defaultTranslation.TR_SEARCHING_DESC)
})

export default connect(mapStateToProps)(LoadingGameScreen);
