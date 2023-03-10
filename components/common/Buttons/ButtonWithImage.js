import React from 'react';
import Text from "../Text/Text";
import styled from "styled-components";
import Sounds, {soundsType} from "../../utils/Sounds";

const ButtonWithImage = (props) => {

    const onClickBtn = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        if(props.clickHandler){
            props.clickHandler()
        }
    }

    return (
        <CollectBtn {...props} 
                    onPress={onClickBtn}
                    style={{ borderBottomWidth: 3 }}
                    activeOpacity={0.9}>
            <PriceImage {...props} source={props.image}/>
            {props.text && <Text setShadow={true} fontFamily={props.fontFamily} small blod color='#fff' center>{props.text}</Text>}
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
  border-radius: 10px;
  margin:${(props)=> props.margin ? `${props.margin}px` : '0px'};
  ${(props)=>{
    return props.color 
            ? `background-color: ${props.color};` 
            : 'background-color: #5eba7d;'
  }};
  ${(props)=>{
      if(props.btnWidth){
          return `
            width: ${props.btnWidth}%;
          `
      }
      if(props.btnHeight){
        return `
           height: ${props.btnHeight}px;
          `
      }
  }};
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