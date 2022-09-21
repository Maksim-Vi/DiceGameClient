import React from 'react'
import { connect, useStore} from 'react-redux'
import {
  selectActiveThrowBtn,
  selectCountScores,
  selectCurrentGameId,
  selectGame,
  selectGameSettings,
  selectIsYouMove,
  selectOpponentThrowData,
  selectScores,
  selectThrowData
} from '../../redux/reducers/game/GameReducer'
import {selectActiveItems, selectMyUser} from '../../redux/reducers/players/PlayersReducer'
import GameContainer from './components/GameContainer'

const GameWrapper = (props) => {
  
  const store = useStore()

  return <GameContainer currentGameId={props.currentGameId}
                        gameSettings={props.gameSettings}
                        currentGame={props.currentGame}
                        user={props.user}
                        throwData={props.throwData}
                        opponentThrowData={props.opponentThrowData}
                        scores={props.scores}
                        activeItems={props.activeItems}
                        countScores={props.countScores}
                        isYouMove={props.isYouMove}
                        activeThrowBtn={props.activeThrowBtn}
                        store={store}/>
}

const mapStateToProps = (state) => ({
  user: selectMyUser(state),
  activeItems: selectActiveItems(state),
  currentGameId: selectCurrentGameId(state),
  gameSettings: selectGameSettings(state),
  currentGame: selectGame(state),
  throwData: selectThrowData(state),
  opponentThrowData: selectOpponentThrowData(state),
  scores: selectScores(state),
  countScores: selectCountScores(state),
  isYouMove: selectIsYouMove(state),
  activeThrowBtn: selectActiveThrowBtn(state),
});

export default connect(mapStateToProps)(GameWrapper);
