import React, {memo, useEffect} from 'react';
import {Animated, Easing, useWindowDimensions} from 'react-native';
import styled from 'styled-components';
import Avatar from '../../../../common/Avatars/Avatar';
import Text from '../../../../common/Text/Text';
import {setTimingAnimated} from "../../../../utils/Animation";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";

const BoardUserInfo = (props) => {

    const {width} = useWindowDimensions()
    const showAvatar = React.useRef(new Animated.Value(0)).current;

    const startAnimation = () =>{
        Animated.sequence([
            Animated.delay(500),
            setTimingAnimated(showAvatar, 1, 500, Easing.ease),
        ]).start(()=>{
            props.setThrowBtn()
        });
    }

    const getColorScoresByCount = () =>{
        if(props.countScores.scoresUser >  props.countScores.scoresOpponent){
            return '#64c553'
        }else if(props.countScores.scoresUser === props.countScores.scoresOpponent){
            return '#354d57'
        }

        return '#c95050'
    }

    useEffect(()=>{
        startAnimation()
    }, [])

    return (
        <BoardAvatarContainer width={width}
                              style={{
                                  opacity: showAvatar.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [0, 1],
                                  }),
                              }}
        >

            <CountContainer width={width} color={getColorScoresByCount()}>
                <CountScores large blod color={'#fff'}>{props.countScores ? props.countScores.scoresUser : 0}</CountScores>
            </CountContainer>

            <Avatar width={width / 5} height={80} avatarId={props.user ? props.user.avatar : 0} avatarFrame={true}/>
            <Name setShadow={true}
                  shadowRadius={1}
                  shadowOffset={{width: -1, height: 2}}
                  shadowColor={'rgb(204,30,30)'}
                  numberOfLines={3}
                  blod color={'#fff'}
                  center>
                {props.user.username || ''}
            </Name>
        </BoardAvatarContainer>
    )
};

const BoardAvatarContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
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

const CountScores = styled(TextWithoutShadow)`
  text-align: center;
`
const CountContainer = styled.View`
  background-color: ${props => props.color ? props.color : '#354d57'};
  border-radius: 5px;
  border: 2px solid #d6dbdd;
  ${(props) => {
    if (props.width <= 400) {
        return `
          margin-bottom: 10px;
          width: 60px;
        `
    } else if (props.width > 400 && props.width <= 550) {
        return `
          margin-bottom: 20px;
          width: 70px;
        `
    } else if (props.width > 550) {
        return `
          margin-bottom: 30px;
          width: 100px;
        `
    }
}}
`
const Name = styled(Text)`

`

export default memo(BoardUserInfo)