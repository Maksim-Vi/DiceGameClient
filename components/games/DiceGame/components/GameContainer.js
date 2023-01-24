import React from 'react'
import styled from 'styled-components'
import Text from '../../../common/Text/Text'
import C_THROW from '../../../protocol/messages/clients/games/C_THROW'
import Dice from './Dice/Dice'
import GameModel from './GameModel/GameModel'
import ScoreBoardOpponent from './ScoreBoardsOpponent/ScoreBoardOpponent'
import ScoreBoardUser from './ScoreBoardsUser/ScoreBoardUser'
import {Animated, Dimensions, Easing, NativeModules, Platform, useWindowDimensions} from "react-native";
import {setTimingAnimated} from "../../../utils/Animation";
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import BoardUserInfo from "./ScoreBoardsUser/BoardUserInfo";
import BoardOpponentInfo from "./ScoreBoardsOpponent/BoardOpponentInfo";

class GameContainer extends React.Component {
    constructor() {
        super()

        this.state = {
            showStartGameText: false,
            showThrowBtn: false,
            opponent: {username: ''},
            boardData: {
                userBoard: [],
                opponentBoard: [],
            },
            winPointsData: {
                userWinPoints: null,
                opponentWinPoints: null
            }
        }

        this.dimensions = Dimensions.get('window')

        this.gameModel = null
        this.StartGameAnimatedValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.gameModel = new GameModel(this.props)

        this.gameModel.setData(this.props.currentGame, this.props.gameSettings)

        if (this.gameModel) {
            let boardData = this.gameModel.getBoardData()
            let winPointsData = this.gameModel.getWinPointsData()

            this.setState({
                boardData: boardData,
                winPointsData: winPointsData,
                opponent: this.gameModel._opponent
            })
        }
    }

    shouldComponentUpdate(prevProps, prevState) {
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
            this.state.opponent !== prevState.opponent ||
            this.state.showStartGameText !== prevState.showStartGameText ||
            this.state.showThrowBtn !== prevState.showThrowBtn
    }

    componentDidUpdate(nextProps, nextState) {
        if (this.props.gameSettings !== nextProps.gameSettings) {
            this.gameModel.setData(this.props.currentGame, this.props.gameSettings)
        }

        if (this.state.showThrowBtn && this.props.scores !== nextProps.scores) {
            const {userId, username, userScores, opponentsScores} = this.props.scores
            let boardData = this.state.boardData
            let winPointsData = this.state.winPointsData

            boardData = this.gameModel.updateScores(userScores, opponentsScores)
            winPointsData = this.gameModel.getWinPointsData()

            this.setState({
                boardData,
                winPointsData
            })
        }
    }

    getThrowData = () => {
        if (!this.state.showThrowBtn) return ''

        if (this.props.isYouMove) {
            return this.props.throwData ? this.props.throwData.diceScore : 0
        }
        return this.props.opponentThrowData ? this.props.opponentThrowData.diceScore : 0
    }

    hendlerThrowGame = () => {
        if (!this.props.activeThrowBtn) return null

        const {id, username} = this.props.user

        new C_THROW(id, username, this.props.currentGameId)
    }

    getActiveItemsByUser = () => {
        if (this.props.gameSettings.bot) return this.props.activeItems

        if (this.props.isYouMove) {
            return this.props.activeItems
        }

        return this.getOpponentActiveItems()
    }

    getOpponentActiveItems = () => {
        if (this.props.gameSettings.bot) return this.props.activeItems

        const {username} = this.props.user

        const opponent = this.props.gameSettings.players.find(opp => opp.username !== username)

        if (opponent) {
            return opponent.activeItems
        } else {
            return this.props.activeItems
        }
    }

    animateStartGameText = () => {
        Animated.sequence([
            setTimingAnimated(this.StartGameAnimatedValue, 1.2, 500, Easing.ease),
            setTimingAnimated(this.StartGameAnimatedValue, 1, 600, Easing.ease),
        ]).start(() => {
            this.setState({showThrowBtn: true, showStartGameText: false})
        });
    }

    render() {
        const {boardData, winPointsData, opponent} = this.state
        return (
            <Game>
                <GameFrame width={this.dimensions.width} height={this.dimensions.height}>
                    <GameBG style={{borderBottomWidth: 5, borderTopWidth: 5}}>
                        <ScoreBoardOpponent board={boardData ? boardData.opponentBoard : null}
                                            winPoints={winPointsData ? winPointsData.opponentWinPoints : null}
                                            oppMove={!this.props.isYouMove}
                                            activeItems={this.getOpponentActiveItems()}
                                            countScores={this.props.countScores}
                                            opponent={opponent}/>
                        <SpaceThrow style={{borderBottomWidth: 3, borderTopWidth: 3}}>
                            <Dice activeItems={this.getActiveItemsByUser()} diceNumber={this.getThrowData()}/>
                        </SpaceThrow>
                        <ScoreBoardUser currentGameId={this.props.currentGameId}
                                        user={this.props.user}
                                        countScores={this.props.countScores}
                                        isYouMove={this.props.isYouMove}
                                        activeItems={this.props.activeItems}
                                        setThrowBtn={() => {
                                            this.setState({showStartGameText: true})
                                            this.animateStartGameText()
                                        }}
                                        winPoints={winPointsData ? winPointsData.userWinPoints : null}
                                        diceScore={this.props.throwData ? this.props.throwData.diceScore : 0}
                                        board={boardData ? boardData.userBoard : null}/>
                    </GameBG>

                    <UsersInfoContainer>
                        <Opponent>
                            <BoardOpponentInfo opponent={opponent}
                                               countScores={this.props.countScores}/>
                        </Opponent>
                        <User>
                            <BoardUserInfo user={this.props.user}
                                           setThrowBtn={() => {
                                               this.setState({showStartGameText: true})
                                               this.animateStartGameText()
                                           }}
                                           countScores={this.props.countScores}/>
                        </User>


                    </UsersInfoContainer>
                </GameFrame>
                {this.state.showThrowBtn &&
                    <ButtonContainer onPress={this.hendlerThrowGame}
                                     activeOpacity={this.props.isYouMove ? 1 : 0.6}
                                     disabled={!this.props.isYouMove}>
                        <Text large heavy color={this.props.isYouMove ? '#095937' : 'rgba(255,255,255,0.51)'}>{this.props.throwText}</Text>
                    </ButtonContainer>
                }

                {this.state.showStartGameText &&
                    <StartGameTextContainer style={{
                        opacity: this.StartGameAnimatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        }),
                        transform: [
                            {
                                scale: this.StartGameAnimatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                })
                            }
                        ]
                    }}>
                        <StartGameText title heavy color={'#fff'}>{this.props.startGameText}</StartGameText>
                    </StartGameTextContainer>
                }
            </Game>
        )
    }
}

const Game = styled.View`
  position: relative;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const GameFrame = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  background: rgba(1, 1, 70, 0.82);
  width: 75%;
  height: 75%;
  margin: 10px;
  border-radius: 20px;
`
const GameBG = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: rgba(176, 176, 176, 0.75);
  border: 2px solid rgba(176, 176, 176, 0.95);
  border-radius: 20px;
`

const UsersInfoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55%;
  margin-left: 20px;
`

const Opponent = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45%;
`

const User = styled.View`
  display: flex;
  align-items: center;
  padding-top: 20px;
  width: 100%;
  height: 45%;
`

const SpaceThrow = styled.View`
  flex: 0.15;
  margin: 10px 0 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(73, 73, 73, 0.07);
  border: 2px solid rgba(73, 73, 73, 0.08);
  width: 80%;
  height: 15%;
  border-radius: 20px;
`

const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props)=> props.activeOpacity ? props.activeOpacity : 0.1};
  flex: 0.3;
  width: 100%;
  height: 12%;
  margin-top: 10px;
`

const StartGameTextContainer = styled(Animated.View)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
`

const StartGameText = styled(Text)`
  font-size: 62px;
  text-shadow: 4px 4px 6px rgba(66, 68, 90, 1);
`

const mapStateToProps = (state) => ({
    throwText: selectTranslation(state, defaultTranslation.TR_THROW_DICE),
    startGameText: selectTranslation(state, defaultTranslation.TR_START_GAME),
})

export default connect(mapStateToProps)(GameContainer);