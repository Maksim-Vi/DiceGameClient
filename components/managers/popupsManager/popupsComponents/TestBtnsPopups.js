import React from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ModalWrapper from '../../../common/ModalWindows/ModalWrapper'
import Text from '../../../common/Text/Text'
import { setGame, setGameSettings, setIsGameStarted, setResultGame } from '../../../redux/reducers/game/GameReducer'
import {
    setADFlashPopup, setADResultPopup,
    setCollectItemPopup,
    setLevelUpPopup,
    setSevenDaysGiftPopup,
    setTestBtnsPopup
} from '../../../redux/reducers/popups/PopupsReducer'
import {getResultScreenData, getStartGameData, transitionState} from '../../../utils/utils'
import FireworkStandart from "../../../common/SpriteSheetViewer/components/FireworkStandart/FireworkStandert";
import FireworkColor from "../../../common/SpriteSheetViewer/components/FireworkColor/FireworkColor";

const TestBtnsPopups = () =>{

    let scrollView = React.useRef(null).current
    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const closeModal = () =>{
        dispatch(setTestBtnsPopup({visible: false}))
    }

    const handelResultClick = () =>{
        dispatch(setResultGame(getResultScreenData()))
        closeModal()
        transitionState('ResultScreen')
    }

    const handelStartGameClick = () =>{
        const currentGame = getStartGameData()
        dispatch(setGame(currentGame))
        dispatch(setGameSettings(currentGame.gameSettings))

        closeModal()

        dispatch(setIsGameStarted(true))
    }

    const handelLoadingProjectClick = () =>{
        transitionState('LoadingProject')
        closeModal()
    }

    const handelLoadingGameClick = () =>{
        transitionState('LoadingGameScreen')
        closeModal()
    }

    const handelSevenDaysGiftClick = () =>{
        dispatch(setSevenDaysGiftPopup({visible: true, data: null}))
        closeModal()
    }

    const handelLvlUpClick = () =>{
        dispatch(setLevelUpPopup({visible: true, data: {
            newLvl: 10,
            prevLvl: 9
        }}))
        closeModal()
    }

    const handelCollectClick = () =>{
        dispatch(setCollectItemPopup({visible: true, data: {type: 'dices', id: 7}}))
        closeModal()
    }

    const handelADResultClick = () =>{
        dispatch(setADResultPopup({visible: true, data: {coins: 3}}))
        closeModal()
    }

    const handelADFlashClick = () =>{
        dispatch(setADFlashPopup({visible: true, data: {flash: 2}}))
        closeModal()
    }

    const renderPopup = () =>{
        return <Scroll ref={ref => {scrollView = ref}}
                       showsVerticalScrollIndicator={true}
                       contentContainerStyle={styles.scroll}>
            <Container>
                <Test onPress={handelStartGameClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>StartGame</Text></Test>
                <Test onPress={handelResultClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Result</Text></Test>
                <Test onPress={handelLoadingProjectClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Loading-Project</Text></Test>
                <Test onPress={handelLoadingGameClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Loading-Game</Text></Test>
                <Test onPress={handelLvlUpClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Lvl up</Text></Test>
                <Test onPress={handelSevenDaysGiftClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Seven Days Gift</Text></Test>
                <Test onPress={handelCollectClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Collect Item</Text></Test>
                <Test onPress={handelADFlashClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>ad flash</Text></Test>
            </Container>
        </Scroll>
    }

    return <ModalWrapper modalBG={'default'} width={width - 50} height={height - 200} modalVisible={true} setModalVisible={closeModal}>
           {renderPopup()}
    </ModalWrapper>
}

const Scroll = styled.ScrollView`
      display: flex;
      width: 100%;
      height: 100%;
`

const Container = styled.View`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
`

const Test = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  height: 60px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
`
const styles = StyleSheet.create({
    scroll:{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-start',
    }
})

export default TestBtnsPopups