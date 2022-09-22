import React from 'react'
import mainBg from '../../../assets/bg/main_bg.jpg'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import ShopContainer from "./components/ShopContainer";

const ShopScreen = () => {
  return (
    <BackgroundWrapper gackground={mainBg}>
        <ShopContainer />
    </BackgroundWrapper>
  )
}

export default ShopScreen