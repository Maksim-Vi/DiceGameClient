import React from 'react';
import Text from "../Text/Text";
import styled from "styled-components";

const ButtonImage = (props) => {
    return (
        <CollectBtn {...props} 
                    onPress={props.clickHandler}
                    activeOpacity={0.9}>
            <Image {...props} source={props.image}/>
            {props.text && <Text small heavy color='#fff' center>{props.text}</Text>}
        </CollectBtn>
    )
}

const Image = styled.Image`
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
  margin: 5px;
`

export default ButtonImage;