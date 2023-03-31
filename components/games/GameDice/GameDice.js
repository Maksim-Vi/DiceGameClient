import React, {PureComponent} from 'react';
import Dice from "./Dice";
import styled from 'styled-components'
import GameModel from "../GameModel/GameModel";
import {selectActiveItems} from "../../redux/reducers/players/PlayersReducer";
import {connect} from "react-redux";
import Dispatcher from "../Events/Dispatcher";

class GameDice extends PureComponent {
    constructor() {
        super();

        this.state = {
            throwData: 0,
            defaultItems: {square: 1000, dice: 1}
        }

    }

    componentDidMount() {
        Dispatcher.add('model:throw', this.getThrowData, this);
        Dispatcher.add('model:updateBoards', this.getThrowData, this);
    }

    componentWillUnmount() {
        Dispatcher.remove('model:throw', this.getThrowData)
        Dispatcher.remove('model:updateBoards', this.getThrowData)
    }

    getActiveItemsByUser = () => {
        if (GameModel.isYouMove) {
            return this.props.activeItems
        }

        return this.getOpponentActiveItems()
    }

    getOpponentActiveItems = () => {
        if (GameModel.gameSettings.bot) return this.state.defaultItems

        const {username} = GameModel.user

        const opponent = GameModel.gameSettings.players.find(opp => opp.username !== username)

        if (opponent) {
            return opponent.activeItems
        } else {
            return this.props.activeItems
        }
    }

    getThrowData()  {
        this.setState({throwData: GameModel.throwData})
    }

    render() {
        return (
            <SpaceThrow style={{borderBottomWidth: 3, borderTopWidth: 3}}>
                <Dice activeItems={this.getActiveItemsByUser()} diceNumber={this.state.throwData}/>
            </SpaceThrow>
        );
    }
}

const SpaceThrow = styled.View`
  flex: 0.15;
  margin: 10px 0 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(73, 73, 73, 0.15);
  border: 2px solid rgba(73, 73, 73, 0.16);
  width: 80%;
  height: 15%;
  border-radius: 20px;
`

const mapStateToProps = (state) => ({
    activeItems: selectActiveItems(state),
})

export default connect(mapStateToProps)(GameDice);
