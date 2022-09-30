import React from 'react';
import gameIcon from "../../../../assets/dice/icons8-dices-98.png";
import styled from "styled-components";
import Text from "../../../common/Text/Text";

const GameWithOpponent = (props) => {

    const hendelClick = () =>{
        props.hendlerPlayGame(2)
    }

    return (
        <OpponentContainer onPress={hendelClick}>
            <GameImage source={gameIcon} resizeMode={ 'stretch'}/>
            <TextCont madium heavy color={'#ff9d4d'} center>Fight&Opp.</TextCont>
        </OpponentContainer>
    );
};

const OpponentContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
`
const GameImage = styled.Image`
  width: 80px;
  height: 80px;
`
const TextCont = styled(Text)`
  text-shadow: 1px 1px 1px #000;
`

export default GameWithOpponent;