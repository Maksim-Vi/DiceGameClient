import React, {useEffect} from 'react';
import styled from "styled-components";
import GameWithBot from "./GameWithBot";
import GameWithOpponent from "./GameWithOpponent";
import GameWithOpponentByTime from "./GameWithOpponentByTime";
import C_QUICK_PLAY from "../../../../protocol/messages/clients/games/C_QUICK_PLAY";
import {selectDefaultParams} from "../../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../../redux/reducers/language/defaultParams";
import {connect} from "react-redux";

const GameList = props => {

    const handlerPlayGame = (gameType) => {
        new C_QUICK_PLAY(gameType)
    }

    return (
        <GameListContainer>
            {props.params.ENABLE_GAME_BOT && <GameWithBot index={0} handlerPlayGame={handlerPlayGame}/>}
            {props.params.ENABLE_GAME_OPPONENT && <GameWithOpponent index={1} handlerPlayGame={handlerPlayGame}/>}
            {props.params.ENABLE_GAME_OPPONENT_BY_TIME && <GameWithOpponentByTime index={2} handlerPlayGame={handlerPlayGame}/>}
        </GameListContainer>
    );
};

const GameListContainer = styled.View`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
`

const mapStateToProps = (state) => ({
    params:{
        ENABLE_GAME_BOT: selectDefaultParams(state, defaultParams.ENABLE_GAME_BOT),
        ENABLE_GAME_OPPONENT: selectDefaultParams(state, defaultParams.ENABLE_GAME_OPPONENT),
        ENABLE_GAME_OPPONENT_BY_TIME: selectDefaultParams(state, defaultParams.ENABLE_GAME_OPPONENT_BY_TIME),
    }
})

export default connect(mapStateToProps)(GameList);