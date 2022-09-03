import React from 'react'
import styled from 'styled-components'
import Text from '../../../common/Text/Text'
import C_THROW from '../../../protocol/messages/clients/games/C_THROW'
import Dice from './Dice/Dice'
import GameModel from './GameModel/GameModel'
import ScoreBoardOpponent from './ScoreBoardsOpponent/ScoreBoardOpponent'
import ScoreBoardUser from './ScoreBoardsUser/ScoreBoardUser'

class GameContainer extends React.Component {
    constructor(){
        super()

        this.state = {
            boardData:{
                opponent: {username: ''},
                userBoard: [],
                opponentBoard: [],
                winPointsData: {
                    userWinPoints: null,
                    opponentWinPoints: null
                }
            }
        }

       this.gameModel = null
    }

    componentDidMount(){
        this.gameModel = new GameModel(this.props)

        this.gameModel.setData(this.props.currentGame, this.props.gameSettings)

        if(this.gameModel){
            let boardData = this.gameModel.getBoardData()
            let winPointsData = this.gameModel.getWinPointsData()

            if(this.props.scores){
                const {userScores, opponentsScores} = this.props.scores
                boardData = this.gameModel.updateScores(userScores,opponentsScores)
                winPointsData = this.gameModel.getWinPointsData()
            }

            this.setState({
                boardData: boardData,
                winPointsData: winPointsData,
                opponent: this.gameModel._opponent
            })
        } 
    }

    shouldComponentUpdate(prevProps, prevState){
        return this.props.gameSettings !== prevProps.gameSettings ||
               this.props.currentGame !== prevProps.currentGame ||
               this.props.currentGameId !== prevProps.currentGameId ||
               this.props.user !== prevProps.user ||
               this.props.throwData !== prevProps.throwData ||
               this.props.opponentThrowData !== prevProps.opponentThrowData ||
               this.props.scores !== prevProps.scores ||
               this.props.scores.opponentsScores !== prevProps.scores.opponentsScores ||
               this.props.countScores !== prevProps.countScores ||
               this.props.isYouMove !== prevProps.isYouMove ||
               this.state.boardData !== prevState.boardData ||
               this.state.boardData.userBoard !== prevState.boardData.userBoard ||
               this.state.boardData.opponentBoard !== prevState.boardData.opponentBoard ||
               this.state.boardData.winPointsData !== prevState.boardData.winPointsData ||
               this.state.opponent !== prevState.opponent
    }

    componentDidUpdate(nextProps){
        if(this.props.gameSettings !== nextProps.gameSettings){
            this.gameModel.setData(this.props.currentGame, this.props.gameSettings)
        }

        if(
            this.props.scores !== nextProps.scores ||
            JSON.stringify(this.props.scores) !== JSON.stringify(nextProps.scores)
        ){
            const {userId, username, userScores, opponentsScores} = this.props.scores
            let boardData = this.state.boardData
            let winPointsData = this.state.winPointsData

            boardData = this.gameModel.updateScores(userScores,opponentsScores)
            winPointsData = this.gameModel.getWinPointsData()

            this.setState({
                boardData,
                winPointsData
            })
        }
    }

    getThrowData = () =>{
        return this.props.throwData ? this.props.throwData.diceScore : 0
    }

    hendlerThrowGame = () =>{
        const {id,username} = this.props.user

        new C_THROW(id,username,this.props.currentGameId)
    }

    render(){
        const {boardData, winPointsData, opponent} = this.state
        return (
            <Game>
                <ScoresContainer>
                    <ScoreBoardOpponent board={boardData ? boardData.opponentBoard : null}
                                        winPoints={winPointsData ? winPointsData.opponentWinPoints : null}
                                        countScores={this.props.countScores}
                                        opponent={opponent}/>
                    <SpaceThrow>
                        <Dice diceNumber={this.getThrowData()}/>
                    </SpaceThrow>
                    <ScoreBoardUser currentGameId={this.props.currentGameId} 
                                    user={this.props.user}
                                    countScores={this.props.countScores}
                                    isYouMove={this.props.isYouMove}
                                    winPoints={winPointsData ? winPointsData.userWinPoints : null}
                                    diceScore={this.props.throwData ? this.props.throwData.diceScore : 0}
                                    board={boardData ? boardData.userBoard : null}/>
                </ScoresContainer>
            
                <ButtonContainer>
                    <ThrowButton onPress={this.props.isYouMove && this.hendlerThrowGame} 
                                 activeOpacity={this.props.isYouMove ? 1 : 0.6} 
                                 disabled={!this.props.isYouMove}>
                        <Text large heavy color={'#fff'}>Throw Dice</Text>
                    </ThrowButton>
                </ButtonContainer>
            </Game>
        )
    }
}

const Game = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
`
const ScoresContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 85%;
`
const SpaceThrow = styled.View`
    display: flex;
`
const ButtonContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
`
const ThrowButton = styled.TouchableOpacity`
    background-color: green;
    border-radius: 10px;
    border: 1px solid #000;
    padding: 10px 50px;
`

export default GameContainer