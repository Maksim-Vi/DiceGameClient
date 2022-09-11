import React from 'react';
import gameIcon from "../../../../assets/dice/game_1V1.png";
import styled from "styled-components";
import Text from "../../../common/Text/Text";

const GameWithBot = (props) => {

    const hendelClick = () =>{
        props.hendlerPlayGame(1)
    }

    return (
       <BotContainer onPress={hendelClick}>
           <GameImage source={gameIcon} />
           <TextCont madium heavy color={'#ff9d4d'} center>Fight&Bot</TextCont>
       </BotContainer>
    );
};

const BotContainer = styled.TouchableOpacity`
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

export default GameWithBot;