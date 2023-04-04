import React, {PureComponent} from 'react';
import styled from 'styled-components'
import BoardUserInfo from "./components/UserInfo/BoardUserInfo";
import BoardOpponentInfo from "./components/OpponentInfo/BoardOpponentInfo";
import Dispatcher from "../Events/Dispatcher";
import GameModel from "../GameModel/GameModel";
import {connect} from "react-redux";
import {selectRestoreGame} from "../../redux/reducers/game/GameReducer";

class GameUsersInfo extends PureComponent {
    constructor() {
        super();

        this.state = {
            countScores: 0,
        }
    }

    componentDidMount() {
        Dispatcher.add('model:updateMaxScores', this.updateScores, this);
    }

    componentWillUnmount() {
        Dispatcher.remove('model:updateMaxScores', this.updateScores)
    }

    updateScores() {
        this.setState({
            countScores: GameModel.countScores,
        })
    }

    showStartGameAnim = () =>{
        if(!this.props.isRestore){
            Dispatcher.dispatch('app:showStartGameAnim', null)
        }
    }

    render() {
        return (
            <UsersInfoContainer>
                <Opponent>
                    {GameModel.opponent && <BoardOpponentInfo opponent={GameModel.opponent}
                                                              countScores={this.state.countScores}/>
                    }
                </Opponent>
                <User>
                    {GameModel.user && <BoardUserInfo user={GameModel.user}
                                                      setThrowBtn={this.showStartGameAnim}
                                                      countScores={this.state.countScores}/>
                    }
                </User>
            </UsersInfoContainer>
        );
    }
}

const UsersInfoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55%;
  margin-left: 25px;
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

const mapStateToProps = (state) => ({
    isRestore: selectRestoreGame(state),
})

export default connect(mapStateToProps)(GameUsersInfo);