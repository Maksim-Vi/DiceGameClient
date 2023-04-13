import React from 'react';
import {connect, useDispatch} from "react-redux";
import styled from "styled-components";
import Text from "../../../../../common/Text/Text";
import dicy from "../../../../../../assets/tutorial/dicy_3.png";
import bg from "../../../../../../assets/topPanel/btns/rewards.png";
import {setTutorialPopup} from "../../../../../redux/reducers/popups/PopupsReducer";
import {selectTranslation, selectUserParams} from "../../../../../redux/reducers/language/LanguageReducer";
import C_CHANGE_USER_PARAM from "../../../../../protocol/messages/clients/C_CHANGE_USER_PARAM";
import userParams from "../../../../../redux/reducers/language/userParams";

const ScreenFive = (props) => {
    const dispatch = useDispatch()

    const close = () =>{
        if(!props.isTutorialShow){
            new C_CHANGE_USER_PARAM(userParams.USER_TUTORIAL_FINISH)
        }
        dispatch(setTutorialPopup({visible: false, data: null}))
    }

    const closePopupBtn = () =>{
        return  <BtnBackground source={bg} resizeMode={'stretch'}>
            <Btn onPress={close} activeOpacity={0.9}>
                <Text setShadow={true} large blod center>{props.finishTutorial}</Text>
            </Btn>
        </BtnBackground>
    }

    const playWithBotBtn = () =>{
        const play = () =>{
            dispatch(setTutorialPopup({visible: false, data: null}))
        }

        return  <BtnBackground source={bg} resizeMode={'stretch'}>
            <Btn onPress={play} activeOpacity={0.9}>
                <Text setShadow={true} large blod center>{props.playWithBot}</Text>
            </Btn>
        </BtnBackground>
    }

    return <ScreenFirstContainer>
        <Container>
            <Text setShadow title blod center>{props.text12}</Text>
            <Dicy source={dicy} resizeMode={'contain'}/>
            <ButtonsContainer>
                {closePopupBtn()}
                {/*{playWithBotBtn()}*/}
            </ButtonsContainer>
        </Container>
    </ScreenFirstContainer>
}

const ScreenFirstContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60%;
`

const ButtonsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`
const BtnBackground = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 70px;
  margin-right: 5px;
`

const Btn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Dicy = styled.Image`
  width: 350px;
  height: 350px;
  margin-left: -30px;
`

const mapStateToProps = (state) => ({
    isTutorialShow: selectUserParams(state,'USER_TUTORIAL_FINISH'),
    text12: selectTranslation(state,'TR_TUTORIAL_TEXT_12'),
    playWithBot: selectTranslation(state,'TR_TUTORIAL_PLAY_WITH_BOT'),
    finishTutorial: selectTranslation(state,'TR_TUTORIAL_FINISH'),
})

export default connect(mapStateToProps)(ScreenFive);