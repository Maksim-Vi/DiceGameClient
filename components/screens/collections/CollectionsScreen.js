import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/collection_bg.jpeg'
import CollectionsContainer from "./components/CollectionsContainer";

const CollectionsScreen = () => {
  return (
    <BackgroundWrapper gackground={mainBg}>
        <CollectionsContainer />
    </BackgroundWrapper>
  )
}

export default CollectionsScreen