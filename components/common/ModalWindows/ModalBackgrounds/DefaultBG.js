import React from 'react'
import styled from 'styled-components'

const DefaultBG = ({children}, props) =>{
    return <Container {...props}>
        {children}
    </Container>
}

const Container = styled.View`
  display: flex;
  align-items: center;
  background-color: #f6dcb9;
  border: 5px solid #b5491d;
  border-radius: 20px;
  width: ${(props) =>  props.width ? props.width : '100%'};
  height: ${(props) =>  props.height ? props.height : '50%'};
`

export default DefaultBG