import React from 'react';
import styled from "styled-components";
import Text from "../../../common/Text/Text";
import {useSelector} from "react-redux";
import {SafeAreaView, ScrollView} from "react-native";

const Statistic = () => {

    const statistics = useSelector(state => state.players.statistics)

    if(!statistics && statistics.bot !== null) return null

    return (
        <ProfileStatistic>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text blod large>Bot statistic:</Text>
                    <BotTab>
                        <Block>
                            <Text blod madium color={'black'}>max games played: </Text>
                            <Text blod large color={'black'}>{statistics.bot.games || 0}</Text>
                        </Block>
                        <Block>
                            <Text blod madium color={'black'}>max won games: </Text>
                            <Text blod large color={'black'}>{statistics.bot.won || 0}</Text>
                        </Block>
                        <Block>
                            <Text blod madium color={'black'}>max lost games: </Text>
                            <Text blod large color={'black'}>{statistics.bot.lost || 0}</Text>
                        </Block>
                    </BotTab>
                    <Text blod large>Opponents statistic</Text>
                    <UsersTab>
                        <Block>
                            <Text blod madium color={'black'}>max games played:</Text>
                            <Text blod large color={'black'}>{statistics.opponent.games || 0}</Text>
                        </Block>
                        <Block>
                            <Text blod madium color={'black'}>max won games: </Text>
                            <Text blod large color={'black'}>{statistics.opponent.games || 0}</Text>
                        </Block>
                        <Block>
                            <Text blod madium color={'black'}>max lost games: </Text>
                            <Text blod large color={'black'}>{statistics.opponent.games || 0}</Text>
                        </Block>
                    </UsersTab>
                </ScrollView>
            </SafeAreaView>
        </ProfileStatistic>
    )
}

const ProfileStatistic = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 90%;
  height: 40%;
  margin-top: 10%;
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
  flex-direction: row;
  background-color: #ead4b6;
  border-radius: 20px;
  border: 3px solid #9a7e67;
  width: 100%;
  margin: 5px;
  padding: 10px;
`

const BotTab = styled.View`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: auto;
`

const UsersTab = styled.View`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: auto;
`
export default Statistic;