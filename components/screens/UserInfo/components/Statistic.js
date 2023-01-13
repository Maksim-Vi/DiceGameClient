import React from 'react';
import styled from "styled-components";
import Text from "../../../common/Text/Text";
import {useSelector} from "react-redux";

const Statistic = (props) => {

    const statistics = useSelector(state => state.players.statistics)

    if (!statistics && statistics.bot !== null) return null

    return (
        <ProfileStatistic>
            <Text blod large>{props.botStatistic}:</Text>
            <BotTab>
                <Block>
                    <Text numberOfLines={1} blod madium color={'black'} center>{props.gamePlayed}: </Text>
                    <Text numberOfLines={1} blod large color={'black'}>{statistics.bot.games || 0}</Text>
                </Block>
                <Block>
                    <Text numberOfLines={1} blod madium color={'black'} center>{props.gameWon}: </Text>
                    <Text numberOfLines={1} blod large color={'black'}>{statistics.bot.won || 0}</Text>
                </Block>
                <Block>
                    <Text numberOfLines={1} blod madium color={'black'} center>{props.gameLose}: </Text>
                    <Text numberOfLines={1} blod large color={'black'}>{statistics.bot.lost || 0}</Text>
                </Block>
            </BotTab>
            <Text blod large>{props.oppStatistic}:</Text>
            <UsersTab>
                <Block>
                    <Text numberOfLines={1} blod madium color={'black'} center>{props.gamePlayed}:</Text>
                    <Text numberOfLines={1} blod large color={'black'}>{statistics.opponent.games || 0}</Text>
                </Block>
                <Block>
                    <Text numberOfLines={1} blod madium color={'black'} center>{props.gameWon}: </Text>
                    <Text numberOfLines={1} blod large color={'black'}>{statistics.opponent.games || 0}</Text>
                </Block>
                <Block>
                    <Text numberOfLines={1} blod madium color={'black'} center>{props.gameLose}: </Text>
                    <Text numberOfLines={1} blod large color={'black'}>{statistics.opponent.games || 0}</Text>
                </Block>
            </UsersTab>
        </ProfileStatistic>
    )
}

const ProfileStatistic = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: auto;
  margin-top: 5%;
  background-color: #2281ce;
  border-radius: 20px;
  border: 3px solid #2b4b8d;
  padding: 10px;
`
const Block = styled.View`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: #ead4b6;
  border-radius: 20px;
  border: 3px solid #9a7e67;
  width: 30%;
  margin: 5px;
  padding: 10px;
`

const BotTab = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`

const UsersTab = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: auto;
`
export default Statistic;