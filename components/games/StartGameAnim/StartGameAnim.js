import React, {Component} from 'react';
import {Animated, Easing} from "react-native";
import styled from 'styled-components'
import Text from "../../common/Text/Text";
import {connect} from "react-redux";
import defaultTranslation from "../../redux/reducers/language/defaultTranslation";
import {selectTranslation} from "../../redux/reducers/language/LanguageReducer";
import {selectRestoreGame} from "../../redux/reducers/game/GameReducer";
import {setTimingAnimated} from "../../utils/Animation";
import Dispatcher from "../Events/Dispatcher";

class StartGameAnim extends Component {
    constructor() {
        super();
        this.state = {
            showStartGameText: false,
        }


        this.StartGameAnimatedValue = new Animated.Value(0)
    }

    componentDidMount() {
        Dispatcher.add('app:showStartGameAnim', this.startAnimation, this)
    }

    startAnimation = () =>{
        this.setState({showStartGameText: true})
        this.animateStartGameText()
    }

    animateStartGameText = () =>{
        if(this.props.isRestore) return this.setState({showStartGameText: false})

        Animated.sequence([
            setTimingAnimated(this.StartGameAnimatedValue, 1.2, 500, Easing.ease),
            setTimingAnimated(this.StartGameAnimatedValue, 1, 600, Easing.ease),
        ]).start(() => {
            this.setState({showStartGameText: false})
        });
    }

    render() {
        return (
            <>
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
                        <StartGameText isShadow={true} title heavy
                                       color={'#000000'}>{this.props.startGameText}</StartGameText>
                    </StartGameTextContainer>
                }
            </>
        );
    }
}

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
    isRestore: selectRestoreGame(state),
    startGameText: selectTranslation(state, defaultTranslation.TR_START_GAME),
})

export default connect(mapStateToProps)(StartGameAnim);
