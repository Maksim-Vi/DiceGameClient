import React from 'react'
import styled from 'styled-components'
import mainBg from '../../../assets/bg/main_bg.jpg'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import Text from '../../common/Text/Text'

const ShopScreen = () => {
  return (
    <BackgroundWrapper gackground={mainBg}>
      <ShopContainer>
        <Text large heavy color={'#000'}>ShopScreen</Text>
      </ShopContainer>
    </BackgroundWrapper>
  )
}

const ShopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export default ShopScreen