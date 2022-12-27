import React, {useState} from 'react';
import styled from 'styled-components/native';

export default TextStyle = ({...props}) => {
    return <Text {...props} adjustsFontSizeToFit numberOfLines={props.numberOfLines || 0}>
        {props.children}
    </Text>
}

const Text = styled.Text`
    color: ${props => props.color ? props.color : '#fff'};
    font-family: 'Dilo-World';
    
    ${({title,large,madium,small,fontSize})=>{
        if(title || large || madium || small){
          switch (true) {
            case title: return 'font-size: 32px'
            case large: return 'font-size: 20px'
            case madium: return 'font-size: 16px'
            case small: return 'font-size: 13px'
            default: return 'font-size: 14px'
          }  
        } else if(fontSize){
          return `font-size: ${fontSize}px`
        }
    }}

    ${({light,blod,heavy})=>{
        switch (true) {
            case light: return 'font-weight: 200'
            case blod: return 'font-weight: 600'
            case heavy: return 'font-weight: 700'
            default: return 'font-weight: 400'
        }
    }}

    ${({center,right})=>{
        switch (true) {
            case center: return 'text-align: center'
            case right: return 'text-align: right'
            default: return 'text-align: left'
        }
    }}
`
