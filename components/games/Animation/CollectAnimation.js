import React, {PureComponent} from 'react';
import Dispatcher from "../Events/Dispatcher";
import {delay} from "../../utils/utils";
import AnimatedLottieView from "lottie-react-native";
import fireworkEffect from "../../../assets/animation/lottieAnim/tap-burst.json";

class CollectAnimation extends PureComponent {
    constructor() {
        super();

        this.state = {
            showCollectAnim: false
        }

        this.addListener()
    }

    addListener = () =>{
        Dispatcher.add('message:collectDices', this.onCollect, this);

    }

    componentWillUnmount() {
        Dispatcher.remove('message:collectDices', this.onCollect)

    }

    onCollect(event){
        const data = event.params

        if(data && this.props.isUserBoard){
            const isCollect = data.indexUniteList.includes(this.props.index);

            if(isCollect){
                this.setState({
                    showCollectAnim: true,
                })
                delay(1000).then(()=>{
                    this.setState({
                        showCollectAnim: false,
                    })
                })
            }
        }
    }

    render() {
        return <>
            {this.state.showCollectAnim &&
                <AnimatedLottieView autoPlay
                                    loop={false}
                                    source={fireworkEffect}
                                    style={{position: 'absolute', zIndex: 1, top: -8, bottom: 0, width: 120, height: 100}} />
            }
        </>
    }
}

export default CollectAnimation