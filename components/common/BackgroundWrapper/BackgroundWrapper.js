import React from 'react'
import styled from 'styled-components'
import defaultBg from '../../../assets/bg/main_bg.jpg'

export default BackgroundWrapper = ({children,gackground}) => {
  return (
    <ContainerApp>
        <Background source={gackground ? gackground : defaultBg} resizeMode="cover">
        {children}
        </Background>
    </ContainerApp>
  )
}

const ContainerApp = styled.View`
    flex: 1;
`
const Background = styled.ImageBackground`
    flex: 1;
`