import React from 'react';
import Text from "../Text/Text";
import styled from "styled-components";

const ButtonWithText = (props) => {

  const btnClickHendler = () =>{
    if(props.disabled) return 

    props.clickHandler()
  }
  
  return (
      <CollectBtn {...props} 
                  disabled={props.disabled || false}
                  onPress={btnClickHendler} 
                  style={{ borderBottomWidth: 3 }}
                  activeOpacity={0.9}>
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
    
    if(props.disabled){
        return `
            background-color: gray;
        `
    }

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
  width: ${(props) =>  props.width ? props.width : '33%'};
  height: ${(props) =>  props.height ? props.height : '30px'};
`

export default ButtonWithText;