import React from 'react'
import styled from 'styled-components'
import Text from '../../../common/Text/Text'
import C_THROW from '../../../protocol/messages/clients/games/C_THROW'
import Dice from './Dice/Dice'
import GameModel from './GameModel/GameModel'
import ScoreBoardOpponent from './ScoreBoardsOpponent/ScoreBoardOpponent'
import ScoreBoardUser from './ScoreBoardsUser/ScoreBoardUser'
import {NativeModules, Platform} from "react-native";

class GameContainer extends React.Component {
    constructor(){
        super()

        this.state = {
            opponent: {username: ''},
            boardData:{
                userBoard: [],
                opponentBoard: [],
            },
            winPointsData: {
                userWinPoints: null,
                opponentWinPoints: null
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
               this.props.countScores !== prevProps.countScores ||
               this.props.isYouMove !== prevProps.isYouMove ||
               this.props.activeThrowBtn !== prevProps.activeThrowBtn ||
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

        if(this.props.scores !== nextProps.scores){
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
        if(this.props.isYouMove){
            return this.props.throwData ? this.props.throwData.diceScore : 0
        }
        return this.props.opponentThrowData ? this.props.opponentThrowData.diceScore : 0
    }

    hendlerThrowGame = () =>{
        if(!this.props.activeThrowBtn) return null

        const {id,username} = this.props.user

        new C_THROW(id,username,this.props.currentGameId)
    }

    getActiveItemsByUser = () =>{
        if(this.props.gameSettings.bot) return this.props.activeItems

        if(this.props.isYouMove) {
            return this.props.activeItems
        }

        const {username} = this.props.user

        const opponent = this.props.gameSettings.players.find(opp => opp.username !== username)

        if(opponent){
            return opponent.activeItems
        } else {
            return this.props.activeItems
        }
    }

    render(){
        const {boardData, winPointsData, opponent} = this.state
        return (
            <Game>
                <ScoresContainer>
                    <ScoreBoardOpponent board={boardData ? boardData.opponentBoard : null}
                                        winPoints={winPointsData ? winPointsData.opponentWinPoints : null}
                                        oppMove={!this.props.isYouMove}
                                        countScores={this.props.countScores}
                                        opponent={opponent}/>
                    <SpaceThrow>
                        <Dice activeItems={this.getActiveItemsByUser()} diceNumber={this.getThrowData()} />
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
                    <ThrowButton onPress={this.hendlerThrowGame}
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
    flex: 0.9;
  ${()=>{
    if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
      return ' flex: 0.8;'
    } else {
      return ' flex: 0.9;'
    }
  }}
`
const SpaceThrow = styled.View`
    display: flex;
`
const ButtonContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0.1;
`
const ThrowButton = styled.TouchableOpacity`
    border-radius: 10px;
    border: 1px solid #000;
    padding: 10px 50px;
  
    ${(props)=>{
        if(props.disabled){
            return `
                background-color: gray;
            `
        } else {
          return `
                background-color: green;
          `
        }
    }}
`

export default GameContainer