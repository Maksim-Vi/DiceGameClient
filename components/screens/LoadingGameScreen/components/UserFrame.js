import React from 'react';
import styled from "styled-components";
import {Animated, Easing} from "react-native";
import Avatar from "../../../common/Avatars/Avatar";
import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../redux/redux-store";
import {setTimingAnimated} from "../../../utils/Animation";

const UserFrame = () => {

    const user = selectMyUser(store.getState())
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    const animateStart = () => {
        Animated.sequence([
            Animated.delay(100),
            setTimingAnimated(animatedValue, 1.1, 500, Easing.ease),
            setTimingAnimated(animatedValue, 1, 400, Easing.ease),
        ]).start();
    }

    React.useEffect(()=>{
        animateStart()
    },[])

    return (
        <UserContainer style={{
            opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [
                {
                    scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            ]
        }}>
            <Avatar avatarId={user.avatar}/>
        </UserContainer>
    );
};

const UserContainer = styled(Animated.View)`
    display: flex;
    width: 100px;
    height: 100px;
`

export default UserFrame;