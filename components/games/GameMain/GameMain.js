import React, {Component} from 'react';
import {Dimensions} from "react-native";
import GameButton from "../GameButton/GameButton";
import GameBoard from "../GameBoard/GameBoard";
import styled from 'styled-components'
import GameUsersInfo from "../GameUsersInfo/GameUsersInfo";
import GameModel from "../GameModel/GameModel";
import StatesManager from "../States/StatesManager";
import {StatesConfig} from "../States/StatesConfig";
import Dispatcher from "../Events/Dispatcher";
import StartGameAnim from "../StartGameAnim/StartGameAnim";
import {selectRestoreGame} from "../../redux/reducers/game/GameReducer";
import {connect} from "react-redux";
import {delay} from "../../utils/utils";

class GameMain extends Component {
    constructor() {
        super();

        GameModel.init()
        this.statesManager = new StatesManager(StatesConfig);

        this.dimensions = Dimensions.get('window')
    }

    componentDidMount() {
        if(this.props.isRestore){
            Dispatcher.dispatch('app:restoreGameStarted',null)
            delay(1000).then(()=>{
                Dispatcher.dispatch('app:restoreGameLoadResources',null)
            })
        } else{
            Dispatcher.dispatch('app:gameStarted',null)
        }
    }

    componentWillUnmount() {
        this.statesManager.destroy();
    }

    render() {
        return (
            <Game>
                <GameFrame width={this.dimensions.width} height={this.dimensions.height}>
                    <GameBoard />
                    <GameUsersInfo />
                </GameFrame>
                <GameButton />
                <StartGameAnim />
            </Game>
        );
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

const mapStateToProps = (state) => ({
    isRestore: selectRestoreGame(state),
})

export default connect(mapStateToProps)(GameMain);