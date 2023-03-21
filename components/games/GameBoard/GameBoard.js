import React, {Component} from 'react';
import gameBg from '../../../assets/bg/gameBG2.jpg'
import styled from 'styled-components'
import OpponentBoard from "./components/OpponentBoard/OpponentBoard";
import UserBoard from "./components/UserBoard/UserBoard";
import GameDice from "../GameDice/GameDice";

class GameBoard extends Component {
    render() {
        return (
            <GameBoardContainer style={{borderBottomWidth: 5, borderTopWidth: 5}}>
                <BackroundGame source={gameBg} imageStyle={{ borderRadius: 15}} resizeMode="cover" >
                    <OpponentBoard />
                    <GameDice />
                    <UserBoard />
                </BackroundGame>
            </GameBoardContainer>
        );
    }
}

const GameBoardContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 1;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(176, 176, 176, 0.95);
  border-radius: 20px;
`

const BackroundGame = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

export default GameBoard