import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ModalWrapper from '../../../common/ModalWindows/ModalWrapper'
import Text from '../../../common/Text/Text'
import { setGame, setGameSettings, setIsGameStarted, setResultGame } from '../../../redux/reducers/game/GameReducer'
import { setTestBtnsPopup } from '../../../redux/reducers/popups/PopupsReducer'
import { getResultScreenData, getStartGameData } from '../../../utils/utils'

const TestBtnsPopups = () =>{
 
    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const closeModal = () =>{
        dispatch(setTestBtnsPopup({visible: false}))
    }

    const hendelResultClick = () =>{
        dispatch(setResultGame(getResultScreenData()))
        closeModal()
        navigation.navigate('ResultScreen')
    }

    const hendelStartGameClick = () =>{
        const currentGame = getStartGameData()
        dispatch(setGame(currentGame))
        dispatch(setGameSettings(currentGame.gameSettings))

        closeModal()

        dispatch(setIsGameStarted(true))
        window.navigation.navigate('GameScreen')
    }

    const hendelLoadingGameClick = () =>{
        window.navigation.navigate('LoadingGameScreen')
        closeModal()
    }

    const renderPopup = () =>{
        return <Container>
            <Test onPress={hendelStartGameClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>StartGame</Text></Test>
            <Test onPress={hendelResultClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Result</Text></Test>
            <Test onPress={hendelLoadingGameClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Loading-Game</Text></Test>
        </Container>
    }

    return <ModalWrapper modalBG={'default'} width={width - 50} height={height - 200} modalVisible={true} setModalVisible={closeModal}>
           {renderPopup()}
    </ModalWrapper>
}

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
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

export default TestBtnsPopups