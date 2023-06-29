import React, {PureComponent} from 'react';
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import Text from "../../common/Text/Text";
import styled from 'styled-components'
import GameModel from "../GameModel/GameModel";
import C_THROW from "../../protocol/messages/clients/games/C_THROW";
import Dispatcher from "../Events/Dispatcher";

class GameButton extends PureComponent {
    constructor() {
        super();

        this.state = {
            isYouMove: false
        }
    }

    componentDidMount() {
        Dispatcher.add('model:startUserThrow', this.onUserThrow, this);
        Dispatcher.add('model:startOpponentThrow', this.onOpponentThrow, this);
    }

    componentWillUnmount() {
        Dispatcher.remove('model:startUserThrow', this.onUserThrow)
        Dispatcher.remove('model:startOpponentThrow', this.onOpponentThrow)
    }

    onUserThrow = () =>{
        this.setState({isYouMove: true})
    }

    onOpponentThrow = () =>{
        this.setState({isYouMove: false})
    }

    handlerThrowGame = () =>{
        if(GameModel && GameModel.user && GameModel.user.username && this.state.isYouMove){
            new C_THROW(GameModel.user.id, GameModel.user.username, GameModel.gameId)
            this.setState({isYouMove: false})
        }
    }

    render() {
        return (
            <ButnContainer>
                <ThrowButton onPress={this.handlerThrowGame}
                             activeOpacity={this.state.isYouMove ? 1 : 0}
                             disabled={!this.state.isYouMove}>
                    <Text setShadow={true} large heavy color={'#fff'}>{this.props.throwText}</Text>
                </ThrowButton>
            </ButnContainer>
        );
    }
}

const ButnContainer = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.3;
  width: 100%;
  height: 12%;
  margin-top: 10px;
`

const ThrowButton = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
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
                background-color: #ff9d4d;
          `
    }
}}
`

const mapStateToProps = (state) => ({
    throwText: selectTranslation(state, defaultTranslation.TR_THROW_DICE),
})

export default connect(mapStateToProps)(GameButton);