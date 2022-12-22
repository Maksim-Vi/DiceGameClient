import React, {useEffect, useState} from 'react';
import {Animated, Easing, useWindowDimensions} from 'react-native';
import styled from 'styled-components';
import Avatar from '../../../../common/Avatars/Avatar';
import Text from '../../../../common/Text/Text';
import {setTimingAnimated} from "../../../../utils/Animation";

const initialScale = 0
const startX = 0
const startY = 0

const endX = 0
const endY = 0

const BoardUserInfo = (props) => {

    const {width, height} = useWindowDimensions()
    const showAvatar = React.useRef(new Animated.Value(0)).current;
    const transformAvatar = React.useRef(new Animated.Value(0)).current;
    const [viewScores, setViewScores] = useState(false)

    const startAnimation = () =>{
        Animated.sequence([
            setTimingAnimated(showAvatar, 1, 800, Easing.ease),
        ]).start(()=>{
            transformToPlace()
        });
    }

    const transformToPlace = () =>{
        Animated.sequence([
            Animated.delay(500),
            setTimingAnimated(transformAvatar, 1, 800, Easing.ease),
        ]).start(()=>{
            props.setThrowBtn()
            setViewScores(true)
        })
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
                                  transform: [
                                      {
                                          scale: showAvatar.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0,1]
                                          })
                                      },
                                      {
                                          translateX: transformAvatar.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [(width / 2), endX]
                                          })
                                      },
                                      {
                                          translateY: transformAvatar.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [-((height / 3) / 10), endY]
                                          })
                                      }
                                  ]
                              }}

        >
            {viewScores &&
                <CountContainer width={width}>
                    <CountScores large blod
                                 color={'#fff'}>{props.countScores ? props.countScores.scoresUser : 0}</CountScores>
                </CountContainer>
            }

            <Avatar avatarId={props.user.avatar}/>
            <Name large blod color={'#000'} center>{props.user.username || ''}</Name>
        </BoardAvatarContainer>
    )
};

const BoardAvatarContainer = styled(Animated.View)`
  position: absolute;
  left: -12%;
  ${(props) => {
    if (props.width <= 400) {
      return `
          top: -20%;
          width: 50px;
          height: 50px;
        `
    } else if (props.width > 400 && props.width <= 550) {
      return `
          top: -35%;
          width: 70px;
          height: 70px;
        `
    } else if (props.width > 550) {
      return `
          top: -40%;
          width: 100px;
          height: 100px;
        `
    }
  }}
`

const CountScores = styled(Text)`
  text-align: center;
`
const CountContainer = styled.View`
  background-color: #354d57;
  border-radius: 5px;
  border: 2px solid #d6dbdd;
  ${(props) => {
    if (props.width <= 400) {
      return `
          margin-bottom: 10px;
          width: 50px;
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

export default BoardUserInfo