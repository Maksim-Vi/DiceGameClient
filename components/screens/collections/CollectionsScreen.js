import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import CollectionsContainer from "./components/CollectionsContainer";

const CollectionsScreen = () => {
  return (
    <BackgroundWrapper gackground={mainBg}>
        <CollectionsContainer />
    </BackgroundWrapper>
  )
}

export default CollectionsScreen