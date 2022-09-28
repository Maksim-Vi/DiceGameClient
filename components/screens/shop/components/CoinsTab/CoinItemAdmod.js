import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Platform} from "react-native";
import Text from "../../../../common/Text/Text";
import ItemWrapper from "../../../collections/components/common/ItemWrapper";


const CoinItemAdmod = (props) => {
    return (
        <ItemWrapper>
            <Text>Admod</Text>
            <AdmodButton onPress={props.admodHendler}>
                <Text>watch video</Text>
            </AdmodButton>
        </ItemWrapper>
    );
};

const AdmodButton = styled.TouchableOpacity`
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

export default CoinItemAdmod;