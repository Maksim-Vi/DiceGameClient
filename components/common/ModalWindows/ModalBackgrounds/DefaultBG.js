import React from 'react'
import styled from 'styled-components'

const DefaultBG = (props) =>{
    return <Container {...props}>
        {props.children}
    </Container>
}

const Container = styled.View`
  display: flex;
  align-items: center;
  background-color: #f6dcb9;
  border: 5px solid #b5491d;
  border-radius: 20px;
  width: ${(props) =>  props.width ? `${Math.floor(props.width)}px`  : '100%'};
  height: ${(props) =>  props.height ? `${Math.floor(props.height)}px` : '50%'};
`

export default DefaultBG