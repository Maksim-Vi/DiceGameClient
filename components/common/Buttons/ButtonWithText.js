import React from 'react';
import Text from "../Text/Text";
import styled from "styled-components";

const ButtonWithText = (props) => {
    return (
        <CollectBtn {...props} onPress={props.clickHandler}>
            <Text small heavy color='#fff' center>{props.text}</Text>
        </CollectBtn>
    )
}

const CollectBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 5px;
  ${(props)=>{
    return props.color 
            ? `background-color: ${props.color};` 
            : 'background-color: rgba(20, 197, 55, 0.84);'
  }};
  border-radius: 10px;
  ${(props)=>{
    return props.borderColor 
            ? `border: 1px solid ${props.borderColor};` 
            : 'border: 1px solid rgb(255, 157, 77);'
  }};
  //padding: 5px 50px 5px 50px;
  width: 33%;
  height: 30px;
`

export default ButtonWithText;