import React from 'react';
import AnimatedLottieView from "lottie-react-native";
import coinsAnim from "../../../assets/animation/lottieAnim/no-connection.json";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectBadConnection} from "../../redux/reducers/Websocket/WebsocketReducer";

const NoConnection = (props) => {

    const isBadConn = useSelector(selectBadConnection)

    console.log('bad connection', isBadConn)

    if(!isBadConn) return

    return <NoConnectionContainer {...props}>
        <AnimatedLottieView loop autoPlay={true}
                            source={coinsAnim}
                            style={{width: 50, height: 50}}/>
    </NoConnectionContainer>

}

const NoConnectionContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 10%;
  width: 50px;
  height: 50px;
  background-color: rgba(162, 159, 159, 0.37);
  border-radius: 100px;
`

export default NoConnection;