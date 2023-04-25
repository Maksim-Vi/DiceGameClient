import React, {PureComponent} from 'react';
import Dispatcher from "../Events/Dispatcher";
import {delay} from "../../utils/utils";
import starsAnim from "../../../assets/animation/lottieAnim/cloud.json";
import AnimatedLottieView from "lottie-react-native";

class KickAnimation extends PureComponent {
    constructor() {
        super();

        this.state = {
            showKickAnim: false,
        }

        this.addListener()
    }

    addListener = () =>{
        Dispatcher.add('message:kickDices', this.onKickDices, this);
    }

    componentWillUnmount() {
        Dispatcher.remove('message:kickDices', this.onKickDices)
    }

    onKickDices(event){
        const data = event.params

        if(data && !this.props.isUserBoard){
            const isKick = data.indexList.includes(this.props.index);
            if(isKick){
                this.setState({
                    showKickAnim: true,
                })
                delay(1000).then(()=>{
                    this.setState({
                        showKickAnim: false,
                    })
                })
            }
        }
    }

    render() {
        return <>
            {this.state.showKickAnim &&
                <AnimatedLottieView autoPlay
                                    loop={false}
                                    source={starsAnim}
                                    style={{position: 'absolute', zIndex: 1, top: -5, bottom: 0, width: 70, height: 70}} />
            }
        </>
    }
}

export default KickAnimation;