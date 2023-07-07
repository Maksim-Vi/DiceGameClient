import React, { memo } from 'react';
import styled from "styled-components";
import {Animated, Easing} from "react-native";
import Avatar from "../../../../common/Avatars/Avatar";
import {setTimingAnimated} from "../../../../utils/Animation";
import Text from "../../../../common/Text/Text";
import constants from '../../../../constants/constants';

const InvitationUserFrame = memo((props) => {

    const animatedValue = React.useRef(new Animated.Value(0)).current;

    const animateStart = () => {
        Animated.sequence([
            Animated.delay(100),
            setTimingAnimated(animatedValue, 1.1, 500, Easing.ease),
            setTimingAnimated(animatedValue, 1, 400, Easing.ease),
        ]).start();
    }

    React.useEffect(() => {
        animateStart()
    }, [])

    const getUser = () =>{
        if(props.user){
            const activeItems = typeof props.user.activeItems === 'string' 
            ? JSON.parse(props.user.activeItems) 
            : props.user.activeItems
    
          return {
            username: props.user.username || "",
            activeItems: activeItems || constants.defaultActiveItems
          }
        }
    }

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
            <Avatar width={80} height={80} user={getUser()} avatarId={props.avatar} avatarFrame={true}/>
            <NameContainer>
                <Text setShadow={true} large blod center>{props.username}</Text>
            </NameContainer>
        </UserContainer>
    );
})

const UserContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
`

const NameContainer = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: rgba(72, 72, 72, 0.35);
  border-radius: 20px;
  border: 3px solid rgba(31, 31, 31, 0.07);
`

export default InvitationUserFrame;