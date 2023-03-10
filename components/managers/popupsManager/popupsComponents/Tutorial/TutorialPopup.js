import React, {useState} from 'react';
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {connect} from "react-redux";
import styled from "styled-components";
import topImageBlock from "../../../../../assets/tutorial/topImg.png";
import bottomImageBlock from "../../../../../assets/tutorial/BottomImg.png";
import Text from "../../../../common/Text/Text";
import ScreenFirst from "./components/ScreenFirst";
import ScreenSecond from "./components/ScreenSecond";
import ScreenThird from "./components/ScreenThird";
import ScreenFour from "./components/ScreenFour";
import ScreenFive from "./components/ScreenFive";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";

const TutorialPopup = (props) => {

    const [currentScreen, setNextScreen] = useState(0)

    const getScreens = () =>{
        switch (currentScreen){
            case 0: return <ScreenFirst />
            case 1: return <ScreenSecond />
            case 2: return <ScreenThird />
            case 3: return <ScreenFour />
            case 4: return <ScreenFive />
            default: return <ScreenFirst />
        }
    }

    const continueScreen = () =>{
        if(currentScreen < 4){
            setNextScreen(currentScreen + 1)
        }
    }

    return <ModalWrapper modalBG={'bg_black'} modalVisible={true}>
        <TutorialContainer>
            <TopBlock source={topImageBlock} resizeMode={'contain'}/>
            <TouchableWithoutFeedback onPress={continueScreen}>
                <TutorialContainer>
                    <ContentContainer>
                        {getScreens()}
                    </ContentContainer>
                    {currentScreen < 4 && <ContinueText>{props.tapToContinue}</ContinueText>}
                </TutorialContainer>
            </TouchableWithoutFeedback>
            <BottomBlock source={bottomImageBlock} resizeMode={'contain'}/>
        </TutorialContainer>
    </ModalWrapper>
}


const TutorialContainer = styled.View`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex: 1;
`

const ContentContainer = styled.View`
  flex: 8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`
const ContinueText = styled(Text)`
  display: flex;
  align-content: flex-end;
  align-items: center;
  justify-content: center;
`

const TopBlock = styled.Image`
  position: absolute;
  top: -20px;
  right: -40px;
  width: 100px;
  height: 100px;
`
const BottomBlock = styled.Image`
  position: absolute;
  bottom: -30px;
  left: -20px;
  width: 100px;
  height: 100px;
`

const mapStateToProps = (state) => ({
    tapToContinue: selectTranslation(state,'TR_TAP_TO_CONTINUE')
})

export default connect(mapStateToProps)(TutorialPopup);