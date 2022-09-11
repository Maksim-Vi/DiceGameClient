import React from 'react';
import gameIcon from "../../../../assets/dice/play_dice.png";
import styled from "styled-components";
import Text from "../../../common/Text/Text";

const GameWithOpponentByTime = (props) => {

    const hendelClick = () =>{
        alert('coming soon')
        //props.hendlerPlayGame(3)
    }

    return (
        <OpponentContainer onPress={hendelClick}>
            <GameImage source={gameIcon} />
            <TextCont madium heavy color={'#ff9d4d'} center>Fight&Opp. by time</TextCont>
        </OpponentContainer>
    );
};

const OpponentContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  opacity: 0.6;
`
const GameImage = styled.Image`
  width: 80px;
  height: 80px;
`
const TextCont = styled(Text)`
  text-shadow: 1px 1px 1px #000;
`

export default GameWithOpponentByTime;