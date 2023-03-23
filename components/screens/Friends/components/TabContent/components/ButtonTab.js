import React from 'react';
import styled from "styled-components";
import Text from "../../../../../common/Text/Text";
import Sounds, {soundsType} from "../../../../../utils/Sounds";

const ButtonTab = (props) => {

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
            <PriceImage {...props} source={props.image} resizeMode={'contain'}/>
            {props.text && <Text setShadow={true} fontFamily={props.fontFamily} small blod color='#fff' center>{props.text}</Text>}
        </CollectBtn>
    )
}

const PriceImage = styled.Image`
  position: absolute;
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
  position: relative;
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
  
  width: 65px;
  height: 40px;
 
  ${(props)=>{
    return props.borderColor
        ? `border: 1px solid ${props.borderColor};`
        : 'border: 1px solid rgb(255, 157, 77);'
  }};
`

export default ButtonTab;