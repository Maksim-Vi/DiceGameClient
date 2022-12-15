import React from 'react';
import Text from "../Text/Text";
import styled from "styled-components";

const ButtonWithImage = (props) => {
    return (
        <CollectBtn {...props} 
                    onPress={props.clickHandler}
                    style={{ borderBottomWidth: 3 }}
                    activeOpacity={0.9}>
            <PriceImage {...props} source={props.image}/>
            {props.text && <Text small heavy color='#fff' center>{props.text}</Text>}
        </CollectBtn>
    )
}

const PriceImage = styled.Image`
  ${(props)=>{
    return props.width
            ? `width: ${props.width}px;`
            : 'width: 30px;'
  }};
  ${(props)=>{
    return props.height
            ? `height: ${props.height}px;`
            : 'height: 30px;'
  }};
`
const CollectBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  //margin: 5px;
  ${(props)=>{
    return props.color 
            ? `background-color: ${props.color};` 
            : 'background-color: #5eba7d;'
  }};
  border-radius: 10px;
  ${(props)=>{
    return props.borderColor 
            ? `border: 1px solid ${props.borderColor};` 
            : 'border: 1px solid rgb(255, 157, 77);'
  }};
  ${(props)=>{
    return props.padding || props.padding === 0
            ? `padding: ${props.padding}px;`
            : ' padding: 5px 40px 5px 40px;'
  }};
`

export default ButtonWithImage;