import React, {PureComponent} from 'react';
import Dispatcher from "../Events/Dispatcher";
import {delay} from "../../utils/utils";
import FlyingAwayAnim from "../../common/AnimationScreens/FlyingAwayAnim";
import star from "../../../assets/common/star.png";

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
                <FlyingAwayAnim countFlyItems={6}
                                minRadius={2}
                                maxRadius={13}
                                icon={star}
                                iconSize={{
                                    width: 20,
                                    height: 20
                                }}
                />
            }
        </>
    }
}

export default CollectAnimation