import React from 'react'
import styled from 'styled-components'
import Avatar from '../../../common/Avatars/Avatar'
import Text from '../../../common/Text/Text'
import place from '../../../../assets/result/place_1.png'

const Winner = ({winner}) => {
   
    if(!winner) return null

    console.log('ANSWER', winner);

    return (
        <WinnerContainer style={{ borderBottomWidth: 5 }}>
            <PlaceContainer>
                <Place source={place} resizeMode={ 'stretch'}/>
                <Avatar width={50} height={50} avatarId={winner.player.avatar}/>
            </PlaceContainer>

            <NameTextContainer>
                <Text title heavy color={'#170231'}>{winner.player.username}</Text>
                <Text color={'#fff'}>Place №1</Text>
            </NameTextContainer>

            <WinsContainer>
                <Text medium heavy color={'#fff'}>coins: {winner.items.coins}</Text>
                <Text medium heavy color={'#fff'}>crystals: {winner.items.crystals}</Text>
                <Text medium heavy color={'#000'}> Combinations: 
                    <Text large heavy color={'#fff'}> {winner.items.scores}</Text> 
                </Text>
            </WinsContainer>

        </WinnerContainer>
    )
}

const WinnerContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: 80px;
    border-radius: 15px;
    background-color: #fecc6b;
    border: 2px solid #955d3d;
`

const PlaceContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
`
const Place = styled.Image`
    width: 50px;
    height: 50px;
    margin: 0 5px;
`
const NameTextContainer = styled.View`
    display: flex;
    flex-direction: column;
`
const WinsContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: 20px;
`

export default Winner