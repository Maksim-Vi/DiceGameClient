import React, {memo, useState} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components';
import ButtonBack from '../../common/Buttons/Back/ButtonBack';
import Text from "../../common/Text/Text";
import vs from '../../../assets/friends/VS.png'
import {transitionState} from "../../utils/utils";
import InvitationUserFrame from "./components/Invitation/InvitationUserFrame";
import {connect, useSelector} from "react-redux";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";
import C_ABORDED_GAME from "../../protocol/messages/clients/games/C_ABORDED_GAME";
import {selectInvitedOpponent} from "../../redux/reducers/players/friendsSelectors";
import ButtonWithText from "../../common/Buttons/ButtonWithText";
import C_START_GAME_WITH_FRIEND from "../../protocol/messages/clients/games/C_START_GAME_WITH_FRIEND";
import {selectCurrentGameId} from "../../redux/reducers/game/GameReducer";
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";

const LoadingInvitationGameScreen = memo(({route, ...props}) => {

    const myUser = useSelector(selectMyUser)
    const currentGameId = useSelector(selectCurrentGameId)
    const invitedOpponent = useSelector(selectInvitedOpponent)
    const [isPressed, setPressedBtn] = useState(false)

    const leaveGame = () =>{
        transitionState('App')
        if(invitedOpponent && invitedOpponent.gameId){
            new C_ABORDED_GAME(invitedOpponent.gameId, invitedOpponent.opponent.username)
        } else if(currentGameId){
            new C_ABORDED_GAME(currentGameId)
        }
    }

    const startGame = () =>{
        setPressedBtn(true)
        new C_START_GAME_WITH_FRIEND(invitedOpponent.gameId, myUser.username, invitedOpponent.opponent.username)
    }

    return (
        <BackgroundWrapper>
            <ButtonBack leaveGame={leaveGame} goMainPage={true}/>

            <Container>
                <TitleContainer>
                    <Text setShadow={true} large blod center>{props.searching}</Text>
                </TitleContainer>

                <LoadingContainer>
                    <InvitationUserFrame username={myUser.username || 'user'}
                                         user={myUser}
                                         avatar={myUser.avatar}/>
                    <VSImage source={vs} resizeMode={'stretch'}/>
                    <InvitationUserFrame username={invitedOpponent ? invitedOpponent.opponent.username : 'opponent'}
                                         user={invitedOpponent ? invitedOpponent.opponent : null}
                                         avatar={invitedOpponent ? invitedOpponent.opponent.avatar : 1000}/>
                </LoadingContainer>

                <ButtonCOntainer>
                    {invitedOpponent && route.params.isOwner
                        ? !isPressed
                            ? <ButtonWithText width={'45%'}
                                            height={'40px'}
                                            color={'#5acb57'}
                                            text={'Start Game'}
                                            clickHandler={startGame}/>
                            : <Text setShadow={true} small blod center>{props.waitingGame}</Text>
                        : invitedOpponent && route.params.isOwner
                            ? <Text setShadow={true} small blod center>{props.waitingPlayer}</Text>
                            : <Text setShadow={true} small blod center>{props.waitingGame}</Text>
                    }
                </ButtonCOntainer>
            </Container>

        </BackgroundWrapper>
    )
})

const Container = styled.View`
    flex: 1;
    align-items: center;
	justify-content: space-evenly;
`

const VSImage = styled.Image`
	width: 120px;
	height: 120px;
`

const LoadingContainer = styled.View`
    align-items: center;
    justify-content: space-around;
	height: 50%;
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
const ButtonCOntainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 70%;
	height: 60px;
`

const mapStateToProps = (state) => ({
    searching: selectTranslation(state, defaultTranslation.TR_SEARCHING_OPPONENT),
    waitingPlayer: selectTranslation(state, defaultTranslation.TR_WAITING_TO_PLAY),
    waitingGame: selectTranslation(state, defaultTranslation.TR_WAITING_TO_PLAY),
})

export default connect(mapStateToProps)(LoadingInvitationGameScreen);
