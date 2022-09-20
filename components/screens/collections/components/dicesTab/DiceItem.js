import React from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import {getCollectionDiceImg} from "../../../../utils/utils";
import CollectButton from "../common/CollectButton";

const DiceItem = ({diceItem}) => {

    return (
        <DiceCard>
            <DiceImage source={getCollectionDiceImg(diceItem.id)}/>
            <Text center>{diceItem.name}</Text>
            <CollectButton item={diceItem}/>
        </DiceCard>
    );
}

const DiceCard = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 40%;
  height: 180px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: rgba(220, 220, 220, 0.73);
  border: 2px solid rgba(229, 229, 229, 0.9);
`
const DiceImage = styled.Image`
  width: 70px;
  height: 70px;
`

export default DiceItem;