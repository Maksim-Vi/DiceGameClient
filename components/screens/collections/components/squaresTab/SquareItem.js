import React from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import { getCollectionSquareImg} from "../../../../utils/utils";
import CollectButton from "../common/CollectButton";

const SquareItem = ({squareItem}) => {
    return (
        <SquareCard>
            <SquareImage source={getCollectionSquareImg(squareItem.name)}/>
            <Text center>{squareItem.name}</Text>
            <CollectButton item={squareItem}/>
        </SquareCard>
    );
}

const SquareCard = styled.View`
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
const SquareImage = styled.Image`
  width: 70px;
  height: 70px;
`
const PriceImage = styled.Image`
  width: 20px;
  height: 20px;
`
const CollectBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: rgba(20, 197, 55, 0.84);
  border-radius: 10px;
  border: 1px solid rgb(255, 157, 77);
  width: 80%;
  height: 30px;
`

export default SquareItem;