import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from "react-redux";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";

const TextStyle = ({...props}) => {

    const ShadowStyle = {
        textShadowColor: props.shadowColor || 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: props.shadowOffset || {width: 0, height: 1},
        textShadowRadius: props.shadowRadius || 2,
        elevation: 6,
    }

    return <Text {...props}
                 style={props.setShadow && ShadowStyle}
                 adjustsFontSizeToFit
                 numberOfLines={props.numberOfLines || 0}>
        {props.children}
    </Text>
}

const Text = styled.Text`
    color: ${props => props.color ? props.color : '#fff'};
    font-family: ${props => {
        if(!props.fontFamily){
            return props.user && props.user.language !== 'EN' ? 'Gogono-Cocoa' : 'Dilo-World'
        } else {
            return props.fontFamily
        }
    }};

    ${({title,large,madium,small,fontSize})=>{
      if (fontSize) {
        return `font-size: ${fontSize}px`
      }
      
        if(title || large || madium || small){
          switch (true) {
            case title: return 'font-size: 32px'
            case large: return 'font-size: 20px'
            case madium: return 'font-size: 16px'
            case small: return 'font-size: 13px'
            default: return 'font-size: 14px'
          }  
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

const mapStateToProps = (state) =>{
    return {
        user: selectMyUser(state)
    }
}

export default connect(mapStateToProps)(TextStyle);