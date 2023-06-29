import React, {PureComponent} from 'react';
import Dispatcher from "../Events/Dispatcher";
import {Animated, Dimensions, Easing} from "react-native";
import collect3 from "../../../assets/animation/animKick/Collect3.png";
import collect2 from "../../../assets/animation/animKick/Collect2.png";
import styled from "styled-components";
import {setTimingAnimated} from "../../utils/Animation";
import Sounds, {soundsType} from "../../utils/Sounds";
import AnimatedLottieView from "lottie-react-native";
import fireworkEffect from "../../../assets/animation/lottieAnim/firework-effect.json";

const {width,height} = Dimensions.get('window')

class CollectTextAnimation extends PureComponent {
    constructor() {
        super();

        this.state = {
            isX2: false,
            showCollectAnim: false
        }
        this.opacity = new Animated.Value(0);

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
            this.setState({
                showCollectAnim: true,
                isX2: data.countUniteDice === 2 ? true : false
            })
        }
    }

    animateStart = () => {
        this.opacity.setValue(0);
        Animated.sequence([
            setTimingAnimated(this.opacity, 1, 400, Easing.in(Easing.bounce), true),
            Animated.delay(500),
            setTimingAnimated(this.opacity, 0, 200, Easing.ease, true),
        ]).start((result)=>{
            if(result){
                this.setState({
                    showCollectAnim: false,
                    isX2: false
                })
            }
        });
    };

    renderCollectTextAnim = () =>{
        let img = collect3

        if(this.state.isX2){
            img = collect2
        }

        Sounds.loadAndPlayFile(soundsType.success)
        this.animateStart()

        const size = this.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        const animatedStyles = [
            {
                opacity: this.opacity,
                transform: [{scale: size}]
            },
        ];

        return (
            <TextAnimImg source={img} style={animatedStyles} resizeMode={'stretch'}/>
        )
    }

    render() {
        return <>
            {this.state.showCollectAnim &&
                this.renderCollectTextAnim()
            }
            {this.state.showCollectAnim &&
                <AnimatedLottieView autoPlay
                                    loop={false}
                                    source={fireworkEffect}
                                    style={{position: 'absolute', zIndex: 1, top: -35, bottom: 0, width: 520, height: 300}} />
            }
        </>
    }
}

const TextAnimImg = styled(Animated.Image)`
  position: absolute;
  width: ${`${width / 2}px`};
  height: ${`${width / 6}px`};
`

export default CollectTextAnimation;