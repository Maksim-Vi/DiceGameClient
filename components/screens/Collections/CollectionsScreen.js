import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import CollectionsContainer from "./components/CollectionsContainer";
import SlideScreen from "../../common/AnimationScreens/SlideScreen";

const CollectionsScreen = () => {
    return (
        <BackgroundWrapper>
            <SlideScreen left={true}>
                <CollectionsContainer/>
            </SlideScreen>
        </BackgroundWrapper>
    )
}

export default CollectionsScreen