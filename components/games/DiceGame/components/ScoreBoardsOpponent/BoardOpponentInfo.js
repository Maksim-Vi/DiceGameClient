import React, {memo, useEffect} from 'react';
import {Animated, Easing, useWindowDimensions} from 'react-native';
import styled from 'styled-components';
import Avatar from '../../../../common/Avatars/Avatar';
import Text from '../../../../common/Text/Text';
import {setTimingAnimated} from "../../../../utils/Animation";

const BoardOpponentInfo = (props) => {

    const {width, height} = useWindowDimensions()
    const showAvatar = React.useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.sequence([
            Animated.delay(500),
            setTimingAnimated(showAvatar, 1, 500, Easing.ease),
        ]).start();
    }

    useEffect(() => {
        startAnimation()
    }, [])

    return (
        <BoardAvatarContainer width={width}
                              height={height}
                              style={{
                                  opacity: showAvatar.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [0, 1],
                                  })
                              }}
        >
            <Name setShadow={true}
                  shadowRadius={1}
                  shadowOffset={{width: -1, height: 2}}
                  shadowColor={'rgb(204,30,30)'}
                  numberOfLines={3}
                  large blod color={'#fff'}
                  center>
                {props.opponent.username || ''}
            </Name>
            <Avatar avatarId={props.opponent.avatar}/>

            <CountContainer width={width}>
                <Text large blod color={'#fff'}
                      center>{props.countScores ? props.countScores.scoresOpponent : 0}</Text>
            </CountContainer>

        </BoardAvatarContainer>
    )
};

const BoardAvatarContainer = styled(Animated.View)`
  ${(props) => {
    if (props.width <= 400) {
      return `
         
          width: 50px;
          height: 50px;
        `
    } else if (props.width > 400 && props.width <= 550) {
      return `
          
          width: 70px;
          height: 70px;
        `
    } else if (props.width > 550) {
      return `
          width: 100px;
          height: 100px;
        `
    }
  }}
`

const CountContainer = styled.View`
  background-color: #354d57;
  border-radius: 5px;
  border: 2px solid #d6dbdd;
  ${(props) => {
    if (props.width <= 400) {
      return `
          margin-top: 10px;
          width: 50px;
        `
    } else if (props.width > 400 && props.width <= 550) {
      return `
          margin-top: 20px;
          width: 70px;
        `
    } else if (props.width > 550) {
      return `
          margin-top: 30px;
          width: 100px;
        `
    }
  }}
`

const Name = styled(Text)`
`

export default memo(BoardOpponentInfo)