import React from 'react';
import Text from "../../../../common/Text/Text";
import styled from "styled-components";
import { getCollectionSquareImg} from "../../../../utils/utils";
import CollectButton from "../common/CollectButton";

const SquareItem = ({squareItem,isActive, isCollected, setModalVisible}) => {
    return (
        <SquareCard style={{ borderBottomWidth: 8 }}>
            <SquareImage source={getCollectionSquareImg(squareItem.sortIndex)}/>
            <Text center>{squareItem.name}</Text>
            <CollectButton item={squareItem}
                           setModalVisible={setModalVisible}
                           isActive={isActive}
                           isCollected={isCollected}/>
        </SquareCard>
    );
}

const SquareCard = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 35%;
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

export default SquareItem;