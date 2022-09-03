import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import styled from 'styled-components'
import Text from '../../common/Text/Text'
import { StatusBar } from 'react-native'
import TopMain from '../../common/TopPanel/TopPanel'

const CollectionsScreen = () => {
  return (
    <BackgroundWrapper gackground={mainBg}>
      <StatusBar />
      <TopMain />

      <CollectionsContainer>
        <Text large heavy color={'#000'}>CollectionsScreen</Text>
      </CollectionsContainer>
  
    </BackgroundWrapper>
  )
}

const CollectionsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export default CollectionsScreen