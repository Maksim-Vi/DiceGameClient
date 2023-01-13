import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ModalWrapper from '../../../common/ModalWindows/ModalWrapper'
import Text from '../../../common/Text/Text'
import { setGame, setGameSettings, setIsGameStarted, setResultGame } from '../../../redux/reducers/game/GameReducer'
import {setLevelUpPopup, setSevenDaysGiftPopup, setTestBtnsPopup} from '../../../redux/reducers/popups/PopupsReducer'
import { getResultScreenData, getStartGameData } from '../../../utils/utils'
import FireworkStandart from "../../../common/SpriteSheetViewer/components/FireworkStandart/FireworkStandert";
import FireworkColor from "../../../common/SpriteSheetViewer/components/FireworkColor/FireworkColor";
import {store} from "../../../redux/redux-store";

const TestBtnsPopups = () =>{

    const [anim, setAnim] = React.useState({
        showFirst: false,
        showSecond: false,
    })

    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const closeModal = () =>{
        dispatch(setTestBtnsPopup({visible: false}))
    }

    const handelResultClick = () =>{
        dispatch(setResultGame(getResultScreenData()))
        closeModal()
        navigation.navigate('ResultScreen')
    }

    const handelStartGameClick = () =>{
        const currentGame = getStartGameData()
        dispatch(setGame(currentGame))
        dispatch(setGameSettings(currentGame.gameSettings))

        closeModal()

        dispatch(setIsGameStarted(true))
        window.navigation.navigate('GameScreen')
    }

    const handelLoadingGameClick = () =>{
        window.navigation.navigate('LoadingGameScreen')
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

    const handelAnim = (type) =>{
        setAnim({...anim, [type]: true})

        setTimeout(()=>{
            setAnim({...anim, [type]: false})
        },3000)
    }

    const renderPopup = () =>{
        return <Container>
            <Test onPress={handelStartGameClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>StartGame</Text></Test>
            <Test onPress={handelResultClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Result</Text></Test>
            <Test onPress={handelLoadingGameClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Loading-Game</Text></Test>
            <Test onPress={handelLvlUpClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Lvl up</Text></Test>
            <Test onPress={handelSevenDaysGiftClick} style={{ borderBottomWidth: 8 }}><Text color={'#000'}>Seven Days Gift</Text></Test>
            <AnimBtnContainer>
                <TextAnim onPress={()=>handelAnim('showFirst')} style={{ borderBottomWidth: 8 }}>
                    <Text center color={'#000'}>show 1 Anim</Text>
                </TextAnim>
                <TextAnim onPress={()=>handelAnim('showSecond')} style={{ borderBottomWidth: 8 }}>
                    <Text center color={'#000'}>show 2 Anim</Text>
                </TextAnim>
            </AnimBtnContainer>
        </Container>
    }

    return <ModalWrapper modalBG={'default'} width={width - 50} height={height - 200} modalVisible={true} setModalVisible={closeModal}>
           {renderPopup()}

        <AnimContainer>
            {anim.showFirst && <FireworkStandart />}
            {anim.showSecond && <FireworkColor />}
        </AnimContainer>
    </ModalWrapper>
}

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
`

const AnimContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`
const AnimBtnContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
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

const TextAnim = styled(Test)`
  width: 30%;
`

export default TestBtnsPopups