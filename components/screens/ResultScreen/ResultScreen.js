import styled from "styled-components";
import Text from "../../common/Text/Text";
import {connect} from "react-redux";
import {selectResultGame, setCountScores} from "../../redux/reducers/game/GameReducer";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {selectCurrentUserId} from "../../redux/reducers/players/PlayersReducer";
import mainBg from "../../../assets/bg/main_bg.jpg";
import BackgroundWrapper from "../../common/BackgroundWrapper/BackgroundWrapper";
import {store} from "../../redux/redux-store";

const ResultScreen = (props) => {

    const navigation = useNavigation()

    const hendlerCloseResult = () => {
        navigation.navigate('MainScreen')
        store.dispatch(setCountScores(null))
    }

    const getWinner = (winner) =>{
       if(!winner) return null

       return (
           <Winner>
               <Text>
                   <Text title heavy color={'#ff9d4d'}> {winner.player.username}</Text>
                   Place №1
               </Text>

               <ItemsWinContainer>
                   <Text medium heavy color={'#fff'}>coins: {winner.items.coins}</Text>
                   <Text medium heavy color={'#fff'}>crystals: {winner.items.crystals}</Text>
               </ItemsWinContainer>

               <Text medium heavy color={'#ff9d4d'}>
                   Combinations: <Text title heavy color={'#000'}> {winner.items.scores}</Text>
               </Text>
           </Winner>
       )
    }

    const getLoser = (loser) => {
        if(!loser) return null

        return (
            <Loser>
                <Text>
                    <Text large heavy color={'black'}>{loser.player.username}</Text>
                    Place №2
                </Text>

                <ItemsWinContainer>
                    <Text medium heavy color={'#fff'}>coins: {loser.items.coins}</Text>
                    <Text medium heavy color={'#fff'}>crystals: {loser.items.crystals}</Text>
                </ItemsWinContainer>

                <Text medium heavy color={'#fff'}>
                    Combinations: <Text title heavy color={'#000'}> {loser.items.scores}</Text>
                </Text>
            </Loser>
        )
    }

    const renderResult = () =>{
        const userData = {
            player: props.result.players.find(user => +user.id === +props.userId),
            items: props.result.userResultItems
        }
        const opponentData = {
            player: props.result.players.find(user => +user.id !== +props.userId),
            items: props.result.opponentResultItems
        }
        const Winner = props.result.userWin ? userData : opponentData
        const Loser = !props.result.userWin ? userData : opponentData

        return (
            <Result>
                {getWinner(Winner)}
                {getLoser(Loser)}
            </Result>
        )
    }

    return (
        <BackgroundWrapper gackground={mainBg}>
            <ResultContainer>
                {renderResult()}
                <PlayButton onPress={hendlerCloseResult}><Text large heavy color={'#fff'}>Continue</Text></PlayButton>
            </ResultContainer>
        </BackgroundWrapper>

    )
}


const ResultContainer = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

const Result = styled.View`
  align-items: center;
  flex-direction: column;
`

const ItemsWinContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 70%;
`

const Winner = styled.View`
    align-items: center;
`
const Loser = styled.View`
    align-items: center;
    margin-top: 20px;
`

const PlayButton = styled.TouchableOpacity`
  background-color: #ff9d4d;
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 50px;
  margin-top: 20px;
`;

const mapStateToProps = (state) => ({
    userId: selectCurrentUserId(state),
    result: selectResultGame(state)
});

export default connect(mapStateToProps)(ResultScreen);